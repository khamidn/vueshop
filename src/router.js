import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store/index.js'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		//jika routenya / maka component yang akan ditampilkan pada route view adalah home
		{ path: '/', name: 'home', component : Home, meta: {title: 'Kayumo -- Home'} },
		{ path: '/about', name: 'about', component: ()=> import('./views/About.vue'), meta: {title: 'Kayumo -- About'} },
		{ path: '/contact', name: 'contact', component: ()=> import('./views/Contact.vue'), meta: {title: 'Kayumo -- Contact'}},
		//jika routenya apapun selain definisi di atas maka component yang akan ditampilkan pada router view
		// adalah Home, route default untuk mencegah error
		{ path: '*', meta: {title: 'Kayumo -- Home'}, redirect:{ name: 'home' } },
		{ path: '/categories', name: 'categories', component: ()=> import('./views/Categories.vue'), meta: { title: 'Kayumo -- Category'} },
		{ path: '/category/:slug', name: 'category', component: () =>import('./views/Category.vue') },
		{ path: '/books', name: 'books', component: ()=> import('./views/Books.vue'), meta: {title: 'Kayumo -- Product'} },
		{ path: '/book/:slug', name: 'book', component: () => import('./views/Book.vue') },
		{ path: '/checkout', name: 'checkout', component: () => import('./views/Checkout.vue'), meta: {title: 'Kayumo -- Checkout', auth:true } }, 
		{ path: '/payment', name: 'payment', component: () => import('./views/Payment.vue'), meta: {title:'Kayumo -- Payment', auth:true } },
		{ path: '/profile', name: 'profile', component: () => import('./views/Profile.vue'), meta: {title:'Kayumo -- Profile', auth:true } },
		{ path: '/my-order', name: 'my-order', component: ()=> import('./views/MyOrder.vue'), meta: {title:'Kayumo -- My Order', auth:true } },
		{ path: '/search2', name:'search2', component: ()=> import('./views/Search2.vue'), meta: {title: 'Kayumo -- Search'}},
		{ path: '/cropper', name: 'cropper', component: ()=> import('./views/Cropper'), meta: {title: 'Kayumo -- Cropper'}},

		//Admin Only

		{ path: '/add-product', name: 'add-product', component: ()=> import('./views/admin/AddProduct.vue'), meta: { title: 'Kayumo -- Add Product'} },
		{ path: '/add-category', name: 'add-category', component: ()=> import('./views/admin/AddCategory.vue'), meta: { title: 'Kayumo -- Category Product'} },
		{ path: '/sales', name: 'sales', component: ()=> import('./views/admin/Sales.vue'), meta: { title: 'Kayumo -- Sales' } },
		{ path: '/spanduk', name: 'spanduk', component: ()=> import('./views/admin/Spanduk.vue'), meta: { title: 'Kayumo -- Spanduk'} },
		{ path: '/about-company', name: 'about-company', component: ()=> import('./views/admin/AboutCompany.vue'), meta: { title: 'Kayumo -- About Kayumo'} },
		{ path: '/setting-contact', name: 'setting-contact', component: ()=> import('./views/admin/SettingContact'), meta: { title: 'Kayumo -- Setting Contact'} } 

		// { path: '/register', name: 'register', component: ()=> import('./views/Register.vue') },
	],
})

router.beforeEach((to, from, next) =>{
	//jika routing ada meta auth-nya maka 
	if(to.matched.some(record => record.meta.auth)){
		//jika user adalah guest
		if(store.getters['auth/guest']){
			//tampilkan pesan bahwa harus login dulu
			store.dispatch('alert/set', {
				status		: true,
				text		: 'Login first',
				type		: 'error',
			})

			//tampilkan form login
			store.dispatch('setPrevUrl', to.path) //untuk menyimpan URL sebelumnya
			store.dispatch('dialog/setComponent', 'login')
			store.dispatch('dialog/setStatus', true)
		}
		else {
			next()
		}
	}

	else {
		next()
	}
})

export default router;
