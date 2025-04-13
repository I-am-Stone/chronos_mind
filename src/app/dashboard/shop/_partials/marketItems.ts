export interface MarketItem {
    id: string;
    name: string;
    price: number;
    icon: string;
    available: number;
    category: string;
    description: string;
  }
  
  export const marketItems: MarketItem[] = [
    // Equipment items
    { id: 'e1', name: 'Helmet', price: 25, icon: '/icons/helmet.svg', available: 8, category: 'Equipment', description: 'A sturdy helmet to protect your head.' },
    { id: 'e2', name: 'Armor', price: 40, icon: '/icons/armor.svg', available: 5, category: 'Equipment', description: 'Heavy armor for maximum protection.' },
    { id: 'e3', name: 'Shield', price: 30, icon: '/icons/shield.svg', available: 7, category: 'Equipment', description: 'A reliable shield to block attacks.' },
    { id: 'e4', name: 'Sword', price: 35, icon: '/icons/sword.svg', available: 4, category: 'Equipment', description: 'A sharp sword for combat.' },
    
    // Basic items
    { id: 'b1', name: 'Health Potion', price: 5, icon: '/icons/health.svg', available: 12, category: 'Basic', description: 'Restores 50 health points when consumed.' },
    { id: 'b2', name: 'Mana Potion', price: 8, icon: '/icons/mana.svg', available: 9, category: 'Basic', description: 'Restores 40 mana points when consumed.' },
    { id: 'b3', name: 'Speed Boost', price: 12, icon: '/icons/speed.svg', available: 6, category: 'Basic', description: 'Increases movement speed for 30 seconds.' },
    { id: 'b4', name: 'Strength Elixir', price: 15, icon: '/icons/strength.svg', available: 7, category: 'Basic', description: 'Boosts strength by 20% for 1 minute.' },
    
    // Mythical items
    { id: 'm1', name: 'Bear Cub Egg', price: 3, icon: '/icons/egg.svg', available: 3, category: 'Mythical', description: 'Find a hatching potion to pour on this egg, and it will hatch into a brave Bear Cub.' },
    { id: 'm2', name: 'Phoenix Feather', price: 85, icon: '/icons/phoenix.svg', available: 3, category: 'Mythical', description: 'A rare feather from a phoenix, glows with magical properties.' },
    { id: 'm3', name: 'Magic Wand', price: 95, icon: '/icons/wand.svg', available: 4, category: 'Mythical', description: 'Channels magical energy for powerful spells.' },
    { id: 'm4', name: 'Enchanted Gem', price: 110, icon: '/icons/gem.svg', available: 1, category: 'Mythical', description: 'A rare gem with unknown magical properties.' },
    
    // Limited Edition
    { id: 'l1', name: 'Golden Crown', price: 200, icon: '/icons/crown.svg', available: 1, category: 'Limited Edition', description: 'A royal crown made of pure gold.' },
    { id: 'l2', name: 'Legendary Bow', price: 180, icon: '/icons/bow.svg', available: 2, category: 'Limited Edition', description: 'A legendary bow with exceptional accuracy.' },
    
    // Functional Cosmetics
    { id: 'c1', name: 'Wizard Hat', price: 45, icon: '/icons/wizard-hat.svg', available: 5, category: 'Functional Cosmetics', description: 'A magical hat that slightly boosts intelligence.' },
    { id: 'c2', name: 'Royal Cape', price: 60, icon: '/icons/cape.svg', available: 4, category: 'Functional Cosmetics', description: 'A majestic cape that grants increased charisma.' },
    { id: 'c3', name: 'Mystic Amulet', price: 50, icon: '/icons/amulet.svg', available: 6, category: 'Functional Cosmetics', description: 'An amulet that enhances magical abilities.' },
    
    // Crafting
    { id: 'cr1', name: 'Iron Ingot', price: 10, icon: '/icons/iron.svg', available: 15, category: 'Crafting', description: 'A refined iron ingot used in crafting.' },
    { id: 'cr2', name: 'Wood Log', price: 5, icon: '/icons/wood.svg', available: 20, category: 'Crafting', description: 'A sturdy log of wood for crafting.' },
    { id: 'cr3', name: 'Magic Dust', price: 15, icon: '/icons/dust.svg', available: 10, category: 'Crafting', description: 'Magical dust used in enchanting items.' },
  ];
  
  export const mockUserBalance = {
    gems: 20,
    gold: 22.49
  };