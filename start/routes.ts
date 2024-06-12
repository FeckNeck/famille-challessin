import './routes/auth.js'
import router from '@adonisjs/core/services/router'

const HomeController = () => import('../app/pages/controllers/home_controller.js')

router.get('/', [HomeController, 'render']).as('home')
