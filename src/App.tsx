import WFWPage from "./pages/WFWPage";
// // import { google, GoogleApis } from "googleapis";
// import { gapi, loadGapiInsideDOM, loadAuth2 } from 'gapi-script';
// import { useEffect, useState } from "react";
// import { IdTokenClient } from "google-auth-library";
// import { google } from "googleapis";
// // import { GoogleAuth, auth } from "google-auth-library";

export const App = () => {
    // const scopes = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";
    // const calendarID  = process.env.REACT_APP_CALENDAR_ID;
    // const apiKey      = process.env.REACT_APP_GOOGLE_API_KEY;
    // const clientID    = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    // const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

    // const calendar = google.calendar({
    //    version: "v3", auth: apiKey, key: clientID
    // })

    // const [tokenClient, setTokenClient] = useState<any>();
    // const [gapiInit, setGapiInit] = useState(false);
    // const [gisInit, setGisInit] = useState(false);
    // const [auth2, setAuth2] = useState();

    // const handleAuth = () => {
    //     tokenClient.callback = async (response: { error: undefined; }) => {
    //         if (response.error !== undefined) throw response;
    //         await listUpcomingEvents();
    //     }
    //     if (gapi.client.getToken() === null) {
    //         tokenClient?.requestAccessToken({prompt: 'consent'})
    //     } else {
    //         tokenClient?.requestAccessToken({prompt: ''});
    //     }
    // }
    // const listUpcomingEvents = async () => {
    //     let response;
    //     try {
    //         const request = {
    //             'calendarId': 'primary',
    //             // 'timeMin': (new Date()).toISOString(),
    //             'showDeleted': false,
    //             'singleEvents': true,
    //             'maxResults': 10,
    //             'orderBy': 'startTime',
    //           };
    //           response = await gapi.client.calendar.events.list(request);
    //     } catch (error) {
    //         console.error(error);
    //         return;
    //     }
    //     const events = response.result.items;
    //     const output = events.reduce((str: any, event: any) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,'Events:\n');
    //     console.debug(output);
    // }

    // useEffect(()=>{
    //     loadAuth2(gapi, clientID||'', scopes).then((auth2) => setAuth2(auth2));
    //     loadGapiInsideDOM().then((gapi) => {});
    // },[])

    return <div className="App">
        <header>
            {/* <button onClick={handleAuth} disabled={!gapiInit || !gisInit}>Authorise</button> */}
            {/* <button onClick={handleSignOut}>Sign Out</button> */}
            </header>
        <WFWPage/>
    </div>
}