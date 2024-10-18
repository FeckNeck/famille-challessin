import { WishlistThemes } from '#wishlists/enums/wishlist_themes'
import WishlistTheme from '#wishlists/models/wishlist_theme'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await WishlistTheme.updateOrCreateMany('id', [
      {
        id: WishlistThemes.Christmas,
        name: 'Noël',
        icon: 'lucide:candy-cane',
        color: '#aef5a8',
      },
      {
        id: WishlistThemes.Birthday,
        name: 'Anniversaire',
        icon: 'lucide:cake',
        color: '#93d2f6',
      },
      { id: WishlistThemes.Other, name: 'Autre', icon: 'lucide:tree-palm', color: '#f7a9a9' },
    ])
  }
}
