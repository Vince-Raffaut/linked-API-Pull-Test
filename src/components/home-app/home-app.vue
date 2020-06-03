<template>
    <div>
        <div><a :href="requestAuthCodeUrl" type="button">Make request</a></div>
        <div><button @click="requestAccessToken" type="button">Get Access token</button></div>
        <div><button @click="requestData" type="button">Get Data</button></div>
        <div>Hi my name is {{ author }}</div>
        <div v-if="requestToken != null">{{ requestToken.access_token }}</div>
        <div>{{ authCodeUrl}}</div>
        <div>{{ userData }}</div>
    </div>
</template>

<script>

    export default {
        name: 'home-app',
        data() {
            return {
                clientId: '86sfzejxg5f140',
                clientSecret: '7OZodLhrKqhTwWUf',
                redirectUri: 'https://localhost:9000/',
                author: 'Vince Raffaut',
                state: '&state=1789asd6asda89sd',
                scope: '&scope=r_basicprofile%20r_emailaddress%20w_member_social',
                authCode: null,
                authCodeUrl: null,
                RequestAuthHost: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code',
                requestAuthCode: null,
                requestAuthCodeUrl: null,
                requestTokenHost: 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code',
                requestTokenCode: null,
                requestTokenUrl: null,
                requestToken: null,
                returnedToken: null,
                requestDataUrl: 'https://api.linkedin.com/v2/me',
                userData: null
            }
        },
        computed: {
            
        },
        methods: {
            requestAccessToken() {
                this.checkUrlForAuthCode();

                const proxyurl = "https://cors-anywhere.herokuapp.com/";

                this.requestTokenUrl = this.requestTokenHost + '&code=' + this.requestTokenCode + '&redirect_uri=' + this.redirectUri + '&client_id=' +  this.clientId + '&client_secret=' +  this.clientSecret;

                fetch(proxyurl + this.requestTokenUrl)
                    .then(response => response.text())
                    .then(contents => (this.requestToken = JSON.parse(contents)))
                    .catch(error => console.log(error));

            },
            checkUrlForAuthCode() {
                if (window.location.href.includes('code=')) {
                    this.requestTokenCode = window.location.href.split('code=')[1];
                }
            },
            requestData() {
                const proxyurl = "https://cors-anywhere.herokuapp.com/";

                const accessToken = this.requestToken.access_token;
                const options = {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'cache-control': 'no-cache',
                        'X-Restli-Protocol-Version': '2.0.0'
                    }
                };

                fetch(proxyurl + this.requestDataUrl, options)
                    .then(response => response.text())
                    .then(contents => (this.userData = JSON.parse(contents)))
                    .catch(error => console.log(error));
            }
        },
        mounted () {
            this.requestAuthCodeUrl = this.RequestAuthHost + '&client_id=' +  this.clientId + '&redirect_uri=' + this.redirectUri + this.scope;
        }
    }
</script>