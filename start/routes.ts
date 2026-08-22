import './routes/auth.js'
import './routes/wishlist/index.js'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.get('/', [controllers.core.Home, 'render']).as('home')
router.get('/img/*', [controllers.core.ShowMedia, 'render']).as('media.show')
