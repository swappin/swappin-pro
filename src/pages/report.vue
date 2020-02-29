<template>
  <div class="historic">
    <div class="page-container" style="padding-bottom: 65px">
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-3 data-card mb-4">
                <div class="card">
                  <h3 class="title-2">12</h3>
                  <h4 class="title-2">Vendas do Dia</h4>
                </div>
              </div>
              <div class="col-lg-3 data-card mb-4">
                <div class="card">
                  <h3 class="title-2">80</h3>
                  <h4 class="title-2">Vendas da Semana</h4>
                </div>
              </div>
              <div class="col-lg-3 data-card mb-4">
                <div class="card">
                  <h3 class="title-2">80</h3>
                  <h4 class="title-2">Vendas do Mês</h4>
                </div>
              </div>
              <div class="col-lg-3 data-card mb-4">
                <div class="card">
                  <h3 class="title-2">#090182</h3>
                  <h4 class="title-2">Produto Campeão</h4>
                </div>
              </div>
              <div class="col-lg-3 data-card mb-4">
                <div class="card">
                  <h3 class="title-2">R${{counterProfity}}</h3>
                  <h4 class="title-2">Lucro do Dia</h4>
                </div>
              </div>
              <div class="col-lg-3 data-card mb-4">
                <div class="card">
                  <h3 class="title-2">R${{counterProfity}}</h3>
                  <h4 class="title-2">Lucro da Semana</h4>
                </div>
              </div>
              <div class="col-lg-3 data-card mb-4">
                <div class="card">
                  <h3 class="title-2">R${{size_pedidos_hoje}}</h3>
                  <h4 class="title-2">Lucros do Mês</h4>
                </div>
              </div>

              <div class="col-lg-3 data-card mb-4">
                <div class="card">
                  <h3 class="title-2">132</h3>
                  <h4 class="title-2">Produtos Vendidos no Mês</h4>
                </div>
              </div>
            </div>
              <div class="row">
              <div class="col-lg-12 mb-5" >
                <div class="card" style="border-top: 4px solid #00BFB2">
                  <div class="card-header d-flex flex-row align-items-center">
                    <h4 class="title-2 mb-0 swappin-color">Vendas na Semana</h4>
                  </div>
                </div>
                <div class="card" style="background:white; border-left:5px solid #00aa8b; padding:10px">
                  <apexchart type="bar" :options="optionsWeek" :series="seriesWeek"></apexchart>
                </div>
              </div>
              <div class="col-lg-6" >
                <div class="card" style="border-top: 4px solid #00BFB2">
                  <div class="card-header d-flex flex-row align-items-center">
                    <h4 class="title-2 mb-0 swappin-color">Vendas no Ano</h4>
                  </div>
                </div>
                <div class="card" style="background:white; border-left:5px solid #00aa8b; padding:10px; min-height: 350px;">
                  <apexchart width="500" type="area" :options="optionsYear" :series="seriesYear"></apexchart>
                </div>
              </div>

              <div class="col-lg-6" >
                <div class="card" style="border-top: 4px solid #00BFB2">
                  <div class="card-header d-flex flex-row align-items-center">
                    <h4 class="title-2 mb-0 swappin-color">Produto mais Vendido</h4>
                  </div>
                </div>
                <div class="card" style="background:white; border-left:5px solid #00aa8b; padding:10px; min-height: 350px">
                  <apexchart width="500" type="donut" :options="optionsProducts" :series="seriesProducts"></apexchart>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase';
import VueApexCharts from 'vue-apexcharts';
export default {
  name: 'Dashboard',
  components: {
    apexcharts: VueApexCharts,
  },
  data(){
    return{
      size:'',
      size_products: '',
      size_amount: '',
      size_pedidos_hoje: '',
      productName: '',
      delivery: '',
      code: '',
      amount:'',
      user:'',
      total:'',
      historys: [],
      counter: '',
      finalDate: '',
      optionsYear: {
        chart: {
          id: 'chart-year',
          width: '100%',
        },
        xaxis: {
          categories: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ]
        },
        fill: {

            type: "gradient",
            gradient: {
              type: "vertical",gradientToColors: [ '#00BFB2'],
              shadeIntensity: 1,
              opacityFrom: 1,
              opacityTo: 0.5,
              stops: [0, 90, 100],
            },
  colors: ['#05A9C7'],
},
      },
      seriesYear: [{
        name: 'Vendas',
        data: [
          130, //Janeiro
          240, //Fevereiro
          145, //Março
          150, //Abril
          249, //Maio
          160, //Junho
          270, //Julho
          291, //Agosto
          191, //Setembro
          194, //Outubro
          291, //Novembro
          391, //Dezembro
        ]
      }],
      optionsWeek: {
        chart: {
          id: 'chart-week',
          width: '100%'
        },
        fill: {

            type: "gradient",
            gradient: {
              type: "vertical",gradientToColors: [ '#00BFB2'],
              shadeIntensity: 1,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 90, 100],
            },
  colors: ['#05A9C7'],
},
        xaxis: {
          categories: [
            'Domingo',
            'Segunda-Feira',
            'Terça-Feira',
            'Quarta-Feira',
            'Quinta-Feira',
            'Sexta-Feira',
            'Sábado',
          ]
        }
      },
      seriesWeek: [{
        name: 'Vendas do Dia',
        data: [
          60, //Domingo
          30, //Segunda
          40, //Terça
          45, //Quarta
          50, //Quinta
          149, //Sexta
          180, //Sábado
        ]
      }],
      optionsProducts: {
        labels: ['Alok Classics.Tech Preto', 'Chilli Glasses Pop One', 'Chilli Hot Girl ', 'Chilli Colab Juliet', 'Nigga Glasses from Chilli',],


          fill: {
            type: "gradient",
          },
      },
      seriesProducts: [
        44, //Product
        55, //Product
        41, //Product
        17, //Product
        15, //Product
      ]


    }
  },
  created () {
    firebase.firestore().collection('stores').where('email', '==', email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        this.name = doc.data().name

        firebase.firestore().collection('stores').doc(this.name).collection('history').onSnapshot((querySnapshot) => {
          this.historys = [];
          let counter = 0;
          let counterProfity = 0;
          querySnapshot.forEach((doc) => {
            this.historys.push({
              productName: doc.data().productName,
              code: doc.data().code,
              amount: doc.data().amount,
              user: doc.data().user,
              total: doc.data().total,
              finalDate: doc.data().finalDate
            });
            counter += doc.data().amount
            this.counter = counter
            counterProfity += doc.data().total
            this.counterProfity = counterProfity

            console.log(this.finalDate)
            firebase.firestore().collection("stores").doc(this.name).collection('history').get().then(snap => {
              this.size = snap.size
            });


          });

        });

        firebase.firestore().collection("stores").doc(this.name).collection('products').get().then(snap => {
          this.size_products = snap.size
        });

        firebase.firestore().collection("stores").doc(this.name).collection('history').where('finalDate', '==' , data()).get().then(snap => {
          this.size_pedidos_hoje = snap.size
        });



      })
    })
  },
  methods:{

    updateGrafico(ano, mes) {
      const customSize = this.size;
      // In the same way, update the series option
      this.series = [{
        data: [customSize]
      }]
    }
  }
}
</script>

<style scoped>
.data-card .card{
  border-radius: 25px !important;
  padding: 10px;
  background: linear-gradient(90deg, #00BFB2, #05A9C7);
  width: 100%;
  box-shadow: rgb(242, 244, 244) 0px 0px 16px 4px;
  border: 0 !important;
}

.data-card .card h4{
  color: #d2f7f5;
}

.data-card .card h3{
  font-size: 30px;
  color: #FFFFFF;
}
#SvgjsPath1023{
  fill: linear-gradient(90deg, #00BFB2, #05A9C7) !important;

}
.apexcharts-bar-area{
  fill: linear-gradient(90deg, #00BFB2, #05A9C7) !important;
}
</style>
