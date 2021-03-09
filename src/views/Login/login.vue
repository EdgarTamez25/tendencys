<template>
  <v-container fluid >
     <v-snackbar v-model="alert.active" multi-line :vertical="alert.vertical" top right :color="alert.color" > 
        <strong> {{alert.text}} </strong>
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text @click="alert.active = false" v-bind="attrs"> Cerrar </v-btn>
        </template>
      </v-snackbar>

    <v-card-text class="mt-2 text-center"  v-if="login">
      <img
        :src="`logo.png`"
        :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
        aspect-ratio="1.5"
        class=" pa-2 mb-5"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        width="25%" 
        transparent
      >
      </img>

      <v-form ref="form" v-model="valid">
        <v-text-field
          autofocus
          v-model="email" 
          prepend-icon="email" 
          label="Email" 
          required
          type="text"
          filled
          class="textos" 
          color="white"
          dark
          :rules="emailRules"
          >
        </v-text-field>

        <v-text-field
          v-model="password"
          prepend-icon="lock"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :rules="passwordRules"
          :type="show1 ? 'text' : 'password'"
          label="Password"
          @click:append="show1 = !show1"
          @keyup.enter="ingresar"
          filled
          class="textos" 
          color="white"
          clearable
          dark
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    
    <v-row class="py-0 mt-0">
      <v-col cols="12" >
        <v-btn :loading="iniciar"
              :disabled="!valid" 
              persistent
              color="success" 
              block 
              rounded
              dark 
              @click="ingresar" 
        >
          Login
        </v-btn>
      
      </v-col>
      <v-col cols="12" class="py-0">
        <v-btn 
              color="white" 
              block 
              rounded
              outlined
              dark 
              @click="$emit('login',false)" 
              >
          Register
        </v-btn>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
  import {mapActions , mapGetters} from 'vuex'
  var md5     = require('md5')

  export default {
    data(){
      return{
        login: true, 
        password: '',
        email:'',
        iniciar: false,
       
        show1: false,

				alert       : { active: false, text:'', color:'error', vertical:true },

        valid: false,
        emailRules    :  [v => !!v || 'required'],
        passwordRules    :  [v => !!v || 'required'],

      }
    },

    methods:{
      // ...mapActions('Login',['Login','salirLogin']),

      ingresar (){
        this.iniciar = true;
        const payload = new Object();
              payload.email = this.email;
              payload.password = md5(this.password)

        this.$http.post('login', payload).then( response =>{
          this.$router.push({ name: 'Home', params:{ users: response.body[0] } })  
          // console.log('Hola de nuevo', response.body[0])
        }).catch( error =>{
				  this.alert = { active: true, text: error.body.message, color:'error', vertical:true };
        }).finally( ()=>{
          this.iniciar = false
        })
        
      }
    }
  };


</script>



  