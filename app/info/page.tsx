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
                "0-5": [1, 5, 13, 11, 80, 71, 417, 119241, 36828, 35237, 286],
                "6-15": [17, 40, 69, 424, 22, 23, 65137, 72676, 118647, 118699],
                "16-30": [62, 85, 63729, 45627, 87275, 146156, 164471, 2007, 1742, 4004],
                "31-50": [75, 14, 10, 6, 145, 120, 50361, 70847, 24, 100, 491],
                "51-100": [246, 422, 913, 53901, 12464, 70, 1475, 122474, 56381, 121922],
                "100+": [356, 36765, 119241, 144511, 119245, 1375, 62391, 27827, 114333, 35236]
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

    if (!gitHubdata || !animeData){
        return (<>
            No profile data
        </>)
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