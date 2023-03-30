import React from 'react'
import "./githubPage.css"

export default function GithubPage(tag) {
    const url = "https://qanpi.github.io/";

    return (
            <iframe src={url + tag} title={tag}></iframe>
    )
}