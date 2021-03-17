import { mapState, mapActions, mapGetters } from 'vuex'
// import { Screen } from 'quasar'
// import smoothscroll from 'smoothscroll-polyfill';

import { date } from 'quasar'
// import serviceLocalizacao from "src/services/localizacao/services-consulta-localizacao";
// import { notifyGenericPositive, notifyGenericNegative } from 'src/functions/functions-notify'
import moment from 'moment'

export default {
  computed: {
    // ...mapState('store_auth', ['loggedIn']),
    // ...mapState('store_plataform', ['mobile', 'desktop']),
    // ...mapGetters('store_auth', ['getUserLogged']),


    userEstaLogado () {
      return this.loggedIn
    },

    isMobile () {
      return this.mobile
    },
    telaWidth () {
      return this.$q.screen.width
    },

    telaHeight () {
      return this.$q.screen.height
    },

    telaXL () {
      return this.$q.screen.xl
    },
    telaLG () {
      return this.$q.screen.lg
    },

    telaMD () {
      return this.$q.screen.md
    },

    telaSM () {
      return this.$q.screen.sm
    },
    telaXS () {
      return this.$q.screen.xs
    },

    userLogado () {
      return this.getUserLogged
    },

    nomeUserLogado () {
      return this.getUserLogged.name
    },
    emailUserLogado () {
      return this.getUserLogged.email
    },
    fotoUserLogado () {
      return this.getUserLogged.photoUrl
    }



  },

  methods: {
    ...mapActions('store_auth', ['logoutUser']),

    home () {
      this.$router.push('/').catch(err => { })
    },

    profile () {
      this.$router.push('/profile').catch(err => { })
    },


    //http://iamdustan.com/smoothscroll/
    scrollBottom () {
      window.scroll({ top: 2500, left: 0, behavior: 'smooth' })
    },

    scrollTop () {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    },

    descer (value) {
      window.scrollBy({ top: value, left: 0, behavior: 'smooth' });
    },

    subir100 () {
      window.scrollBy({ top: -100, left: 0, behavior: 'smooth' });
    },

    getLocalizacao () {
      navigator.geolocation.getCurrentPosition(position => {

        this.getEnderecoLocalizacao(position.coords.latitude, position.coords.longitude)

      }, erro => {
        console.log(erro)
        notifyGenericNegative('Localização bloqueada pelo navegador!')
      }, { timeout: 7000 })
    },

    getEnderecoLocalizacao (latitude, longitute) {
      serviceLocalizacao.BuscarLocalizacaoService(latitude, longitute).then((resposta) => {
        console.log(resposta)
      })
    },

    formatarReal (value) {
      //sem RS
      //value.toLocaleString('pt-br', { minimumFractionDigits: 2 });
      //com RS
      return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    },

    formatarData (value) {
      moment.locale('pt-br');
      return moment(value).format('DD/MM/YYYY')
      //  return date.formatDate(value, 'D/M/YYYY')
    },

    formatarDataMoment (value) {
      moment.locale('pt-br');
      return moment(value).format('YYYY-MM-DD')
      //return date.formatDate(value, 'YYYY-MM-DD')
    },

    formatarDataFirebase (value) {
      let dt = value.split('/')

      let ano = dt[2]
      let mes = dt[1]
      let dia = dt[0]
      let formatedDate = ano + "-" + mes + "-" + dia;

      return formatedDate
    },

    formatarDataFirebaseFiltro (value) {
      let dt = value.split('/')

      console.log(value)
      console.log(dt)

      let ano = dt[0]
      let mes = dt[1]
      let dia = dt[2]
      let formatedDate = ano + "-" + mes + "-" + dia;

      return formatedDate
    },

    mesCorrente () {
      var month = new Array();
      month[0] = "Janeiro";
      month[1] = "Fevereiro";
      month[2] = "Março";
      month[3] = "Abril";
      month[4] = "Maio";
      month[5] = "Junho";
      month[6] = "Julho";
      month[7] = "Agosto";
      month[8] = "Setembro";
      month[9] = "Outubro";
      month[10] = "Novembro";
      month[11] = "Dezembro";

      var d = new Date();
      var mes = month[d.getMonth()];
      return mes
    },

    primeiroDiaMes () {
      moment.locale('pt-br');
      var begin = moment().format("YYYY-MM-01");
      return date.formatDate(begin, 'x')
    },

    ultimoDiaMes () {
      var end = moment().format("YYYY-MM-") + moment().daysInMonth();
      return date.formatDate(end, 'x')
    },

    minutoAtual () {
      moment.locale('pt-br');
      return moment().format('MMMM Do YYYY, h:mm:ss a')
    },

    // mes(){
    ///////   //primeiro e ultimo dia mês //////////////
    //   var date = new Date();
    //   var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //   var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    // }






  },

  //Inserir v-focus onde pretende deixar onfocus
  directives: {
    focus: {
      // definição da diretiva
      inserted: function (el) {
        //console.log(el.innerHTML)
        el.focus()
      }
    }
  },

  filters: {
    filterDataFormatada (value) {
      moment.locale('pt-br');
      return moment(value).format('DD/MM/YYYY')
    },

    filterDiaDaSemana (value) {
      let nome = moment(value).format('dddd').replace('-feira', '')
      nome = nome[0].toUpperCase() + nome.substr(1);
      let data = moment(value).format('DD/MM/YYYY')
      return nome + ', ' + data
    },

    filterDiaDaSemanaNumero (value) {
      return moment(value).format('DD/MM');
    },

    filterNomeDiaSemana (value) {
      return moment(value).format('LL')

    },


    filterMoedaFormatada (value) {
      return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    },

    filterPrimeiraLetra (value) {
      return value.charAt(0).toUpperCase()

      // const str = 'ricardo';
      // const capitalized = str[0].toUpperCase() + str.substr(1); // Ricardo

    }
  }
}