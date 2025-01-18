"use client"

import { Suspense } from 'react'

export default function(){
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Info></Info>
        </Suspense>
    )
}


import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MainPage } from "../components/MainPage" 
import { BackgroundLines } from "../components/background-lines"
import { Katana } from "../components/Katana"
import { NotFound } from "../components/NotFound404"
import { Spinner } from '../components/Spinner'

interface githubData{
    name: string
    avatar_url: string
    login: string
    bio: string
    public_repos: number
    followers: number
    following: number
    public_gists: number
    message?: string
}

interface animeData{
    name: string
    images: {
        jpg: {
            image_url: string
        }
    }
    name_kanji: string
    about: string
}

function Info(){
    const id = useSearchParams()
    const githubId = id.get('id')
    const [gitHubdata, setGitHubData] = useState<githubData>()
    const [animeData, setAnimeData] = useState<animeData>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!githubId){
            setError(true)
            setLoading(false)
            return 
        }
        const fetchGithubData = async() => {
            const res = await fetch(`https://api.github.com/users/${githubId}`)
            const data = await res.json()
            if(data.message === "Not Found"){
                setError(true)
            }
            setGitHubData(data)
            setLoading(false)
        }
        fetchGithubData()
    }, [githubId])

    


    const animeBio: Record<string, string> = {
        "0-5": 'Thoughtful but reserved, like starting out.', "6-15": 'Growing and developing, just like a hero.', "16-30": 'Hardworking and starting to achieve goals.', "31-50": 'Pushing limits, achieving milestones.', "51-100": 'Strategic and impactful, leading a revolution.', "100+": 'A genius with a massive impact in the field.'
    }

    useEffect(() => {
        if (!gitHubdata){
            return 
        }
        const determineAnimeChar = (publicRepos: number) => {
            const animeCharGroup: Record<string, number[]> = {
                "0-5": [145],
                "6-15": [4775, 3178, 3889, 2008, 23420, 23418],
                "16-30": [1555, 2174, 3770, 1901],
                "31-50": [2007, 306, 1694, 1902, 1900, 1555, 22893, 2405, 3179, 2006],
                "51-100": [1662, 307, 2455, 2767, 2672],
                "100+": [17, 13, 3180, 2910, 14, 18473, 2423, 53901, 2535, 12465, 12464, 85]
            }
            if (publicRepos <= 5) {
                return randomFromArray(animeCharGroup["0-6"])
            }
            if (publicRepos <= 15) {
                return randomFromArray(animeCharGroup["6-15"])
            }
            if (publicRepos <= 30) {
                return randomFromArray(animeCharGroup["16-30"])
            }
            if (publicRepos <= 50) {
                return randomFromArray(animeCharGroup["31-50"])
            }
            if (publicRepos <= 100) {
                return randomFromArray(animeCharGroup["51-100"])
            }
            return randomFromArray(animeCharGroup["100+"])
        }

        const randomFromArray = (arr: number[]) => 
            arr[Math.floor(Math.random() * arr.length)]


        const fetchAnimeData = async() => {
            const charId = determineAnimeChar(gitHubdata.public_repos)
            const res = await fetch(`https://api.jikan.moe/v4/characters/${charId}`)
            const data = await res.json()
            setAnimeData(data.data)
        }
        fetchAnimeData()
    }, [gitHubdata])

    if(error){
        return (
            <NotFound></NotFound>
        )
    }

    var bio = ''

    if (!gitHubdata?.public_repos){
        bio = 'Keep Husting'
        return 
    }

    if (gitHubdata?.public_repos <=5 ){
        bio = animeBio["0-5"]
    }
    else if (gitHubdata?.public_repos <=15 ){
        bio = animeBio["6-15"]
    }
    else if (gitHubdata?.public_repos <=30 ){
        bio = animeBio["16-30"]
    }
    else if (gitHubdata?.public_repos <=50 ){
        bio = animeBio["31-50"]
    }
    else if (gitHubdata?.public_repos <=100 ){
        bio = animeBio["51-100"]
    }
    else{
        bio = animeBio["100+"]
    }

    console.log(gitHubdata?.public_repos)


    if(loading){
        return (
            <>
                Loading...
            </>
        )
    }

    if (!gitHubdata){
        return (<>
            No profile data
        </>)
    }

    if(!animeData){
        return (
            <>
                <Spinner></Spinner>
            </>
        )
    }
    

    return (
        <>
            <div>
                <Katana></Katana>
                <BackgroundLines className="w-full px-4">
                    <div className="">
                        <MainPage githubImage={gitHubdata.avatar_url} animeImage={animeData?.images.jpg.image_url} githubBio={gitHubdata.bio || "Keep Husting~"} githubname={gitHubdata.name} githubusername={gitHubdata.login} name={animeData.name} name_kanji={animeData.name_kanji} animeBio={bio}></MainPage></div>
                    
                </BackgroundLines>
            </div>
        </>
    )
}