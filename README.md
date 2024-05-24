## Code Co-Reviewer App

This is my first FullStack with **React** App, and there was another chalenge.<br> That forced me to use **Socked.io** library in order to make this app<br> work with multiple clients and connected between them.<br>
In this App I used [React+Vite](https://vitejs.dev/guide/) with **NodeJs** as base. <br>
This one was made with **Chakra**, which is have alot of ready components.<br>
To run this App [NodeJs](https://nodejs.org/en/download/current) is required to be installed.<br>
Server and Client communicates between them with API. **MongoDB** was used as data base.<br>

### How to run the App:

#### First run server part:

- Go to directory **_modules/dbModule.js_** in line number 3 you must write: `const url = "YourMongoBDLink"` .(You must to have [MongoDB](https://www.mongodb.com/cloud/atlas/register?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general_prosp-brand_gic-null_emea-il_ps-all_desktop_eng_lead&utm_term=mongo%20database&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=1718986534&adgroup=66929800266&cq_cmp=1718986534&gad_source=1&gclid=CjwKCAjwl4yyBhAgEiwADSEjeIfv6Salm2LWP60ZUc-NnBt0FFdoDDQ_jFy_2PpPtbDA2tuydoqNzxoC_M0QAvD_BwE) account)

- Go to console in aplication directory enter command `npm i`

- Then in console enter command `node server.js`

#### Then run client part:

- Go to console in aplication directory enter command `npm i`
- Then in console enter command `npm run dev`
- In your browser follow the link that will appear in console

### Description:

This is simple apliction with **_lobby page_** of **_code blocks_**. You can click on any block to enter its page. This apliction may work with **more than one client**. First who enters the code block page will be on **_read only mode_**, any others who enters after will be able to change the code. During code change everyone can see it live.
