import './routes/auth.js'
import './routes/wishlists.js'
import router from '@adonisjs/core/services/router'

const HomeController = () => import('../app/pages/controllers/home_controller.js')
const ShowMediaController = () => import('#core/controllers/show_media_controller')

router.get('/', [HomeController, 'render']).as('home')
router.get('/img/*', [ShowMediaController, 'render']).as('media.show')
