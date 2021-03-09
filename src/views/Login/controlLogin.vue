<template>
  <v-container fluid class="fondo">
    <v-row justify="space-around" align="center" class="mx-2 ">

      <v-col cols="12" sm="8" md="6" lg="4" xl="3" class="mt-12" >
        <v-card class="elevation-20 pa-2" id="contenedor" v-ripple>
          <login v-if="login"     @login="login = $event"/>
          <register v-if="!login" @login="login = $event"/>
        </v-card>
      </v-col> 

    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'
import {mapActions , mapGetters} from 'vuex'

import login    from '@/views/Login/login.vue'
import register from '@/views/Login/register.vue'

  export default {
    components:{
      login,
      register
    },
    data(){
      return{
        login: true, 
              }
    },

    methods:{
      // ...mapActions('Login',['Login','salirLogin']),

    }
  };


</script>

<style scoped>
    #contenedor{
    background: #eeacb5;  
    background: -webkit-linear-gradient(to right, #37364052, #37364052);  
    background: linear-gradient(to right, #3736405f, #373640b6); 
    border-radius:25px;
  }
  
  .fondo{
    background: #ee9ca7;  
    background: -webkit-linear-gradient(to right, #f3b8bf, #464258);  
    background: linear-gradient(to right, hsla(237, 10%, 38%, 0.653), #464258),url('https://sofsolution.com/tendencys/fondo1.jpg'); 
    background-attachment: fixed;
    background-size: cover;
    padding: 0px;
    margin: 0px;
    width: auto;
    height: 100%;
  }

 
</style>



  