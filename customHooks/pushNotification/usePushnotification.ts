"use client";

import { useEffect } from "react";
import axios from "axios";


export default function usePushNotification() {


    useEffect(() => {


        const subscribe = async () => {

            try {

                const permission =
                    await Notification.requestPermission();


                if (permission !== "granted") {
                    return;
                }


                const registration =
                    await navigator.serviceWorker.ready;



                // Check existing subscription
                let subscription =
                    await registration.pushManager.getSubscription();



                // Create new subscription only if not exists
                if (!subscription) {

                    subscription =
                        await registration.pushManager.subscribe({

                            userVisibleOnly: true,

                            applicationServerKey:
                                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY

                        });

                }



                const subscriptionJSON = subscription.toJSON();

                console.log("REAL SUB:", subscriptionJSON);


                await axios.patch(
                    "http://localhost:4000/push-subscribe",
                    {
                        subscription: subscriptionJSON
                    },
                    {
                        withCredentials: true
                    }
                );


                console.log(
                    "Subscription saved"
                );


            } catch (error) {

                console.log(
                    "Push Error:",
                    error
                );

            }

        };


        subscribe();


    }, []);


}