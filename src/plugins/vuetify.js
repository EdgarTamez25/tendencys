import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
			themes: {
				light: {
					celeste: '#0096cb', // CELESTE
					negro: '#272727',   // NEGRO
					gris: '#6f7170'     // GRIS
				},
			},
		},

    lang:{
        locales:{ es },
        current: 'es'
    }
});
