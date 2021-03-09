<template>
  <v-container fluid>
    <v-snackbar v-model="alert.active" multi-line :vertical="alert.vertical" top right :color="alert.color" > 
      <strong> {{alert.text}} </strong>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text @click="alert.active = false" v-bind="attrs"> Cerrar </v-btn>
      </template>
    </v-snackbar>

    <v-card-text class="white--text font-weight-bold headline">
      REGISTER USER
    </v-card-text>
    <v-form ref="form" v-model="valid" >
      <v-row>
        <v-col cols="12" >
          <v-text-field
            v-model ="name"
            append-icon="person"
            label="Full Name"
            placeholder="Full Name"
            hide-details
            dark
            filled
            :rules="nameRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12"  >
          <v-text-field
            v-model ="last_name"
            append-icon="person"
            label="Username"
            placeholder="Username "
            hide-details
            dark
            filled
            :rules="lastNameRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="email"
            append-icon="email" 
            label="Email"
            placeholder="Email"
            hide-details
            dark
            filled
            :rules="emailRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" >
          <v-text-field
            v-model ="country"
            append-icon="location_city"
            label="Country"
            placeholder="Country "
            hide-details
            						dark		
            filled
            :rules="countryRules"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" >
          <v-text-field
            v-model ="phone"
            append-icon="phone"
            label="Phone"
            placeholder="Phone "
            hide-details
            dark
            filled
            type="number"
            :rules="phoneRules"
          ></v-text-field>
        </v-col>

        <template >
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'visibility_off' : 'visibility'"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              placeholder="Password"
              filled
              dark
              hide-details
              @click:append="show1 = !show1"
              :rules="pass1Rules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="6">
            <v-text-field
              v-model="password2"
              :append-icon="show2 ? 'visibility_off' : 'visibility'"
              :type="show2 ? 'text' : 'password'"
              label=" Confirm Password"
              placeholder="Confirm Password "
              filled
              dark
              hide-details
              @click:append="show2 = !show2"
              :rules="pass2Rules"
            ></v-text-field>
          </v-col>
        </template>

        <v-col cols="6">
          <v-btn block dark center class="white--text" color="error" @click="$emit('login',true)" >
              <v-icon left> keyboard_backspace </v-icon> Return
          </v-btn>
        </v-col>

        <v-col cols="6">
          <v-btn block :disabled="!valid" persistent :loading="overlay" dark center class="white--text" color="success" @click="validaPasswords" >
             Save <v-icon right> save </v-icon> 
          </v-btn>
        </v-col>
       
      </v-row>
    </v-form>

    <overlay v-if="overlay"/>

  </v-container >
</template>

<script>
	import overlay     from '@/components/overlay.vue'
	var md5 = require('md5');

	export default {
	  components: {
			overlay
		},

	  data () {
			return {
				titleModal: 'Users',

				// VARIABLES PRINCIPALES
				id_usuario:  null,
				name		  : '',
				email		  : '',
				last_name : '',
				country   : '',
				phone     : '',
				password			:'',
				password2			:'',

					// VARIABLES PARA CONTRASEÑA
				show1					: true,
				show2					: true,
				
				valid: false,
				nameRules     : [v => !!v || 'Es requerido'],
				lastNameRules :  [v => !!v || 'Es requerido'],
				emailRules    :  [v => !!v || 'Es requerido'],
				countryRules  :  [v => !!v || 'Es requerido'],
				phoneRules    :  [v => !!v || 'Es requerido'],
				pass1Rules    :  [v => !!v || 'Es requerido'],
				pass2Rules    :  [v => !!v || 'Es requerido'],
				
				alert       : { active: false, text:'', color:'error', vertical:true },
				overlay     : false,
				
			}
		},
		
		methods:{
			validaPasswords(){
        if(this.password.localeCompare(this.password2) ){ //  VERIFICO QUE LAS CONTRASEÑAS SEAN IGUALES
          this.alert    = { active: true, text:'Passwords no match', color:'error' }; return;
        }
        this.PreparateDataSend()
			},

			PreparateDataSend(){
        // PREPARO EL OBJETO QUE ENVIARE A INSERTAR
				const payload = new Object();
							payload.name      = this.name;
							payload.last_name = this.last_name;
							payload.email     = this.email;
							payload.country   = this.country;
							payload.phone     = this.phone;
							payload.password  = md5(this.password);

        this.registerUser(payload); // MANDO A REGISTRAR EL USUARIO
			},

			registerUser(payload){
				this.overlay = true; // ACTIVO OVERLAY DE ESPERA.
				this.$http.post('register.user', payload).then((response)=>{
				  let that = this ;
          this.alert    = { active: true, text: response.body.message, color:'success' };
          this.limpiarCampos();
          setTimeout(() =>{ that.$emit('login', true)}, 2000);

				}).catch(error =>{
          this.alert    = { active: true, text: error.body.message, color:'error' };
				}).finally( ()=>{ 
          this.overlay = false
        })
			},
			
			limpiarCampos(){
				this.name      = '';
				this.last_name = '',
				this.email     = '',
        this.country   = '',
        this.phone     = '',
				this.password  = '',
				this.password2 = '';
			}
		}
	}
</script>