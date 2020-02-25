<template>
  <div class="dashboard">
    <div class="page-container">
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid" >
            <div class="row">
              <div class="col-lg-12" style=" margin:0 auto ">
                <div class="card" style="border-top: 4px solid #00BFB2">
                  <div class="card-header d-flex flex-row align-items-center">
                    <h4 class="title-2 mb-0 swappin-color">Histórico de Pedidos</h4>
                  </div>
                </div>
              </div>
            </div>
            <table class="products-table table">
              <thead>
                <th colspan="2">
                  <h4 class="title-2 mr-2" style="color: #A5A5A5; margin: 35px 0px !important;">Lista de Pedidos</h4>
                </th>
                <th colspan="7">
                  <form class="form-group d-flex flex-row justify-content-end" action="" method="POST" style="float: right; max-width: 450px; margin: 20px; margin-left: 0">
                    <input class="au-input au-input--xl" v-model="search" type="text"  name="search" placeholder="Pesquisar produtos..." style="padding-left: 20px !important;"/>
                    <button type="submit" style="position: absolute; display: contents">
                      <img src="../assets/icons/search.png" class="icon justify-content-end" style="margin-right: 20px !important"/>
                    </button>
                  </form>
                </th>
              </thead>
              <thead>
                <tr>
                  <th scope="col"><h4 class="title-2">Data</h4></th>
                  <th scope="col"><h4 class="title-2">Código</h4></th>
                  <th scope="col" style="min-width: 320px"><h4 class="title-2">Produtos</h4></th>
                  <th scope="col"><h4 class="title-2">Preço Total</h4></th>
                  <th scope="col"><h4 class="title-2">Método de Pagamento</h4></th>
                  <th scope="col"><h4 class="title-2">Cliente</h4></th>
                  <th scope="col"><h4 class="title-2">Avaliação</h4></th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="history in historic" :key="history.id" style="border-top: 1px solid #EEE !important;">
                  <th scope="row">
                    <h4 class="title-2" style="color: #999">{{ convert( history.finalDate.seconds * 1000) }}</h4>
                  </th>

                  <th scope="row"><h4 class="title-2" style="color: #999">{{history.code}}</h4></th>
                  <td>

                    <div class="row" v-for="(product, index) in history._products">
                      <div class="col-lg-3" ><p>{{ history._amounts[index] }} x</p></div>
                      <div class="col-lg-6" ><p>{{ history._products[index] }}</p></div>
                      <div class="col-lg-3 d-flex justify-content-end"><p><b>R${{ history._prices[index] }}</b></p></div>
                    </div>
                  </td>
                  <td><p>{{history.total}}</p></td>
                  <td><p>{{history.method}}</p></td>
                  <td><p>{{history.userName}}</p></td>
                  <td class="d-flex">
                    <img src="../assets/icons/star_favorite_1.png" class="icon justify-content-end" v-for="i in history.score" style="float: left; margin-right: 5px"/>
</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Dashboard',
  data(){
    return{
      size:'',
      name: '',
      historic: [],
    }
  },
  created () {
    firebase.firestore().collection('stores').where('email', '==', email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        this.name = doc.data().name

        firebase.firestore().collection('stores').doc(this.name).collection('historic').orderBy('finalDate').onSnapshot((querySnapshot) => {
          this.historic = [];
          let counter = 0;
          let counterProfity = 0;
          querySnapshot.forEach((doc) => {
            this.historic.push({
              key: doc.id,
              code: doc.data().code,
              total: doc.data().total,
              note: doc.data().note,
              userName: doc.data().userName,
              initialDate: doc.data().initialDate,
              finalDate: doc.data().finalDate,
              method: doc.data().method,
              score: doc.data().score,
              _prices: doc.data()._prices,
              _amounts: doc.data()._amounts,
              _products: doc.data()._products,
            });

            this.historic.reverse();
            counter += doc.data().amount
            this.counter = counter
            counterProfity += doc.data().total
            this.counterProfity = counterProfity

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
  methods: {
    convert: function(dateToFormat) {
      var date = new Date(dateToFormat),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      hour = ("0" + date.getHours()).slice(-2),
      min = ("0" + date.getMinutes()).slice(-2),
      dateFormated = [date.getFullYear(), month, day].join("-") + " às " +  hour + ":" + min;
      return dateFormated;
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  }
}
</script>

<style scoped>

</style>
