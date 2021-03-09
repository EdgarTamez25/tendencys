<template>
  <v-container fluid class="pa-0">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="6" xl="7">
        <v-row class="my-0 pa-5" justify="center">
          <v-col cols="12" class="text-center">
            <v-card class="conteiner">
              <v-card-text id="title">
                WELCOME TO TENDENCYS
              </v-card-text>
              <v-card-subtitle id="subtitle">
                {{ userData.last_name}}
              </v-card-subtitle>
            </v-card>
            
          </v-col>
          <v-col cols="12">
            <v-img
              src="@/assets/pizarra.svg"
              class="black--text align-end "
            >
            </v-img>
          </v-col>

          <v-btn color="primary" dark left absolute fixed bottom @click="logout = true">
            Logout
            <v-icon right>exit_to_app</v-icon>
          </v-btn>

         <v-dialog v-model="logout" width="400px">
          <v-card dark class="pa-1" >
            <v-card-title class=" white--text font-weight-medium ">
            You want to close session?
            </v-card-title>
            <v-card-actions class="mt-6">
              <v-spacer></v-spacer>
              <v-btn color="error" outlined small @click="logout=false" >Cancel</v-btn>
              <v-btn class="black--text" color="white"  small :to="{name:'login'}">Logout</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

                
        </v-row>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
  export default {
    data:()=>({
      userData: {},
      logout:false
    }),
    created(){
      if(!this.$route.params.users){  this.$router.push({ name: 'login' })  } // SI NO OBTENGO LA INFORMACION RETORNO VISTA.
      this.userData = this.$route.params.users
    }
  }
</script>


<style scoped>
  .conteiner{
    background: #383132;  
    background: -webkit-linear-gradient(to right, #38373d52, #37364052);  
    background: linear-gradient(to right, #3736405f, #363442b6); 
  }
  #title{
    color: white;
    font-size: 30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
  }

  #subtitle{
    color: white;
    font-size: 30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
  }
</style>