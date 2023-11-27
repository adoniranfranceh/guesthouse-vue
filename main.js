const app = Vue.createApp({
  data(){
  	return{
      brand_name: 'Pousada Árvore da Coruja',
      city: 'Gramado',

      listInns: [
                  {
                    id: 1,
                    brandName: 'Pousada Árvore da Coruja',
                    city: 'Gramado',
                    phone: '8989898',
                    email: '',
                    address: '',
                    neighborhood: '',
                    state: '',
                    city: '',
                    zip_code: '',
                    description: '',
                    payment_methods: '',
                    accepts_true: '',
                    usage_policies: '',
                    check_in: '',
                    check_out: '',
                    average_rating: ''
                  }
      	        ],
      listRooms: [
                    {
                   	  innId: 1,
                        title: 'Solarme Room'
                    },

                    {
                   	  innId: 1,
                      title: 'Bangalô Família'
                    }
                ],
      selectedId: null
  	}
  },

  methods:{
  	async getInnData(){
      let response = await fetch('http://localhost:3000/api/v1/inns')
      let data = await response.json()
      
      this.listInns = []

      data.forEach(item => {
      	var inn = new Object

        inn.id             = item.id 
        inn.brandName      = item.brand_name
      	inn.phone          = item.phone
        inn.email          = item.email
        inn.address        = item.address
        inn.neighborhood   = item.neighborhood
        inn.state          = item.state
        inn.city           = item.city
        inn.zipCode        = item.zip_code
        inn.description    = item.description
        inn.paymentMethods = item.payment_methods
        inn.acceptsPets    = item.accepts_pets
        inn.usagePolicies  = item.usage_policies
        inn.checkIn        = item.check_in
        inn.checkOut       = item.check_out
        inn.averageRating  = item.average_rating
        inn.listRooms = this.getRoomData(item.id)

        this.listInns.push(inn)
      });
  	},

  	async getRoomData(id){
      let response = await fetch(`http://localhost:3000/api/v1/inns/${id}/rooms`)
      let data = await response.json()
      
      this.listRooms = []

      data.forEach(item => {
        var room = new Object

        room.id                    = item.id
        room.innId                 = item.inn_id
        room.title                 = item.title
        room.description           = item.description
        room.dimension             = item.dimension
        room.maxOccupancy          = item.max_occupancy
        room.dailyRate             = item.daily_rate
        room.privateBathroom       = item.private_bathroom
        room.balcony               = item.balcony
        room.airConditioning       = item.air_conditioning
        room.tv                    = item.tv
        room.wardrobe              = item.wardrobe
        room.safeAvailable         = item.safe_available
        room.accessibleForDisabled = item.accessible_for_disabled
        room.forReservations       = item.for_reservations

        this.listRooms.push(room)
      })
  	},

  	showDetails(id){
  	  this.selectedId = id
  	},

  	hideDetails(){
  	  this.selectedId = null
  	}
  }
  
});

app.mount('#app');
