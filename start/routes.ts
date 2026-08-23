import './routes/auth.js';
import './routes/wishlist/index.js';

import router from '@adonisjs/core/services/router';

import { controllers } from '#generated/controllers';

router.get('/', [controllers.core.Home, 'render']).as('home');
router.get('/img/*', [controllers.core.ShowMedia, 'render']).as('media.show');
