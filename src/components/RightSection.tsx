"use client";
import React, { useState } from 'react'
import styles from '@/styles/RightSection.module.css'
import userlogo from '@/assets/userlogo.png'
import nouserlogo from '@/assets/nouserlogo.png'
import bgptlogo from '@/assets/b.png'
import Image from 'next/image'

const openAiAPI = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const RightSection = () => {
    const [message, setMessage] = useState('')

    const [allMessages, setAllMessages] = useState<any[]>([])

    const sendMessage = async () => {
        // console.log(message)
        let url = "https://api.openai.com/v1/chat/completions"

        let token = `Bearer ${openAiAPI}`
        let model = 'gpt-3.5-turbo'

        let messagesToSend = [
            ...allMessages,
            {
                role: 'user',
                content: message
            }
        ]

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: messagesToSend
            })
        })
        let resjson = await res.json()
        if (resjson) {
            // console.log(resjson)

            // console.log(resjson.choices[0].message)

            let newAllMessages = [
                ...messagesToSend,
                resjson.choices[0].message
            ]

            // console.log(newAllMessages)

            setAllMessages(newAllMessages)
            setMessage('')
        }
    }
    return (
        <div className={styles.rightSection}>
            <div className={styles.chatgptversion}>
                <p className={styles.text1}>BhilaiGPT 1.O</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

            </div>


            {
                allMessages.length > 0 ?
                    <div className={styles.messages}>
                        {allMessages.map((msg, index) => (
                            <div key={index} className={styles.message}>
                                <Image src={msg.role === 'user' ? userlogo : bgptlogo} width={50} height={50} alt="" />
                                <div className={styles.details}>
                                    <h2>{msg.role === 'user' ? 'You' : 'BhilaiGPT'}</h2>
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className={styles.nochat}>
                        <div className={styles.s1}>
                            <Image src={bgptlogo} alt="chatgpt" height={70} width={70} />
                            <h1>Discover queries to all of your IIT BHilai University in one place for convenience the access.</h1>
                            {/* <h1>Put ur Queries to takes Ransome Information</h1> */}
                        </div>

                    </div>
            }

            <div className={styles.bottomsection}>
                <div className={styles.messagebar}>
                    <input type='text' placeholder='Insert Query Here'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />

                    <svg
                        onClick={sendMessage}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>

                </div>

            </div>
        </div>
    )
}

export default RightSection