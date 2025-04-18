export interface MarketItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
    description: string;
  }
  
  export const marketItems: MarketItem[] = [
    // Equipment items
    { id: 'e1', name: 'Helmet', price: 25, image: '/images/helmet.svg', quantity: 8, category: 'Equipment', description: 'A sturdy helmet to protect your head.' },
    { id: 'e2', name: 'Armor', price: 40, image: '/images/armor.svg', quantity: 5, category: 'Equipment', description: 'Heavy armor for maximum protection.' },
    { id: 'e3', name: 'Shield', price: 30, image: '/images/shield.svg', quantity: 7, category: 'Equipment', description: 'A reliable shield to block attacks.' },
    { id: 'e4', name: 'Sword', price: 35, image: '/images/sword.svg', quantity: 4, category: 'Equipment', description: 'A sharp sword for combat.' },
    
    // Basic items
    { id: 'b1', name: 'Health Potion', price: 5, image: '/images/health.svg', quantity: 12, category: 'Basic', description: 'Restores 50 health points when consumed.' },
    { id: 'b2', name: 'Mana Potion', price: 8, image: '/images/mana.svg', quantity: 9, category: 'Basic', description: 'Restores 40 mana points when consumed.' },
    { id: 'b3', name: 'Speed Boost', price: 12, image: '/images/speed.svg', quantity: 6, category: 'Basic', description: 'Increases movement speed for 30 seconds.' },
    { id: 'b4', name: 'Strength Elixir', price: 15, image: '/images/strength.svg', quantity: 7, category: 'Basic', description: 'Boosts strength by 20% for 1 minute.' },
    
    // Mythical items
    { id: 'm1', name: 'Bear Cub Egg', price: 3, image: '/images/egg.svg', quantity: 3, category: 'Mythical', description: 'Find a hatching potion to pour on this egg, and it will hatch into a brave Bear Cub.' },
    { id: 'm2', name: 'Phoenix Feather', price: 85, image: '/images/phoenix.svg', quantity: 3, category: 'Mythical', description: 'A rare feather from a phoenix, glows with magical properties.' },
    { id: 'm3', name: 'Magic Wand', price: 95, image: '/images/wand.svg', quantity: 4, category: 'Mythical', description: 'Channels magical energy for powerful spells.' },
    { id: 'm4', name: 'Enchanted Gem', price: 110, image: '/images/gem.svg', quantity: 1, category: 'Mythical', description: 'A rare gem with unknown magical properties.' },
    
    // Limited Edition
    { id: 'l1', name: 'Golden Crown', price: 200, image: '/images/crown.svg', quantity: 1, category: 'Limited Edition', description: 'A royal crown made of pure gold.' },
    { id: 'l2', name: 'Legendary Bow', price: 180, image: '/images/bow.svg', quantity: 2, category: 'Limited Edition', description: 'A legendary bow with exceptional accuracy.' },
    
    // Functional Cosmetics
    { id: 'c1', name: 'Wizard Hat', price: 45, image: '/images/wizard-hat.svg', quantity: 5, category: 'Functional Cosmetics', description: 'A magical hat that slightly boosts intelligence.' },
    { id: 'c2', name: 'Royal Cape', price: 60, image: '/images/cape.svg', quantity: 4, category: 'Functional Cosmetics', description: 'A majestic cape that grants increased charisma.' },
    { id: 'c3', name: 'Mystic Amulet', price: 50, image: '/images/amulet.svg', quantity: 6, category: 'Functional Cosmetics', description: 'An amulet that enhances magical abilities.' },
    
    // Crafting
    { id: 'cr1', name: 'Iron Ingot', price: 10, image: '/images/iron.svg', quantity: 15, category: 'Crafting', description: 'A refined iron ingot used in crafting.' },
    { id: 'cr2', name: 'Wood Log', price: 5, image: '/images/wood.svg', quantity: 20, category: 'Crafting', description: 'A sturdy log of wood for crafting.' },
    { id: 'cr3', name: 'Magic Dust', price: 15, image: '/images/dust.svg', quantity: 10, category: 'Crafting', description: 'Magical dust used in enchanting items.' },
  ];
  
  export const mockUserBalance = {
    gems: 20,
    gold: 22.49
  };