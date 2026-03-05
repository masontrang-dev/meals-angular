import { Recipe } from '../models/recipe.model';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 1001,
    title: 'Classic Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    readyInMinutes: 30,
    servings: 4,
    summary: 'A classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
    cuisines: ['Italian'],
    dishTypes: ['lunch', 'dinner'],
    diets: ['vegetarian'],
    extendedIngredients: [
      { id: 1, name: 'pizza dough', amount: 1, unit: 'lb', original: '1 lb pizza dough' },
      { id: 2, name: 'tomato sauce', amount: 0.5, unit: 'cup', original: '1/2 cup tomato sauce' },
      { id: 3, name: 'fresh mozzarella', amount: 8, unit: 'oz', original: '8 oz fresh mozzarella' },
      { id: 4, name: 'fresh basil', amount: 0.25, unit: 'cup', original: '1/4 cup fresh basil leaves' },
      { id: 5, name: 'olive oil', amount: 2, unit: 'tbsp', original: '2 tbsp olive oil' }
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 285, unit: 'kcal' },
        { name: 'Protein', amount: 12, unit: 'g' },
        { name: 'Fat', amount: 10, unit: 'g' },
        { name: 'Carbohydrates', amount: 36, unit: 'g' }
      ]
    }
  },
  {
    id: 1002,
    title: 'Grilled Chicken Caesar Salad',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    readyInMinutes: 25,
    servings: 2,
    summary: 'Fresh romaine lettuce with grilled chicken, parmesan, and Caesar dressing.',
    cuisines: ['American'],
    dishTypes: ['lunch', 'salad'],
    diets: ['gluten free'],
    extendedIngredients: [
      { id: 6, name: 'chicken breast', amount: 2, unit: 'pieces', original: '2 chicken breasts' },
      { id: 7, name: 'romaine lettuce', amount: 1, unit: 'head', original: '1 head romaine lettuce' },
      { id: 8, name: 'parmesan cheese', amount: 0.5, unit: 'cup', original: '1/2 cup grated parmesan' },
      { id: 9, name: 'Caesar dressing', amount: 0.25, unit: 'cup', original: '1/4 cup Caesar dressing' },
      { id: 10, name: 'croutons', amount: 1, unit: 'cup', original: '1 cup croutons' }
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 420, unit: 'kcal' },
        { name: 'Protein', amount: 35, unit: 'g' },
        { name: 'Fat', amount: 22, unit: 'g' },
        { name: 'Carbohydrates', amount: 18, unit: 'g' }
      ]
    }
  },
  {
    id: 1003,
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
    readyInMinutes: 20,
    servings: 4,
    summary: 'Traditional Italian pasta with eggs, cheese, pancetta, and black pepper.',
    cuisines: ['Italian'],
    dishTypes: ['dinner'],
    diets: [],
    extendedIngredients: [
      { id: 11, name: 'spaghetti', amount: 1, unit: 'lb', original: '1 lb spaghetti' },
      { id: 12, name: 'pancetta', amount: 6, unit: 'oz', original: '6 oz pancetta, diced' },
      { id: 13, name: 'eggs', amount: 4, unit: 'large', original: '4 large eggs' },
      { id: 14, name: 'parmesan cheese', amount: 1, unit: 'cup', original: '1 cup grated parmesan' },
      { id: 15, name: 'black pepper', amount: 1, unit: 'tsp', original: '1 tsp black pepper' }
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 580, unit: 'kcal' },
        { name: 'Protein', amount: 24, unit: 'g' },
        { name: 'Fat', amount: 28, unit: 'g' },
        { name: 'Carbohydrates', amount: 58, unit: 'g' }
      ]
    }
  },
  {
    id: 1004,
    title: 'Avocado Toast with Poached Egg',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
    readyInMinutes: 15,
    servings: 1,
    summary: 'Creamy avocado on toasted sourdough topped with a perfectly poached egg.',
    cuisines: ['American'],
    dishTypes: ['breakfast', 'brunch'],
    diets: ['vegetarian'],
    extendedIngredients: [
      { id: 16, name: 'sourdough bread', amount: 2, unit: 'slices', original: '2 slices sourdough bread' },
      { id: 17, name: 'avocado', amount: 1, unit: 'whole', original: '1 ripe avocado' },
      { id: 18, name: 'eggs', amount: 2, unit: 'large', original: '2 large eggs' },
      { id: 19, name: 'lemon juice', amount: 1, unit: 'tsp', original: '1 tsp lemon juice' },
      { id: 20, name: 'salt', amount: 0.25, unit: 'tsp', original: '1/4 tsp salt' }
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 340, unit: 'kcal' },
        { name: 'Protein', amount: 14, unit: 'g' },
        { name: 'Fat', amount: 20, unit: 'g' },
        { name: 'Carbohydrates', amount: 28, unit: 'g' }
      ]
    }
  },
  {
    id: 1005,
    title: 'Thai Green Curry',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400',
    readyInMinutes: 35,
    servings: 4,
    summary: 'Aromatic Thai curry with coconut milk, vegetables, and your choice of protein.',
    cuisines: ['Thai', 'Asian'],
    dishTypes: ['dinner'],
    diets: ['gluten free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 450, unit: 'kcal' },
        { name: 'Protein', amount: 28, unit: 'g' },
        { name: 'Fat', amount: 24, unit: 'g' },
        { name: 'Carbohydrates', amount: 32, unit: 'g' }
      ]
    }
  },
  {
    id: 1006,
    title: 'Greek Yogurt Parfait',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    readyInMinutes: 10,
    servings: 1,
    summary: 'Layers of Greek yogurt, granola, fresh berries, and honey.',
    cuisines: ['Greek'],
    dishTypes: ['breakfast', 'snack'],
    diets: ['vegetarian', 'gluten free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 280, unit: 'kcal' },
        { name: 'Protein', amount: 18, unit: 'g' },
        { name: 'Fat', amount: 8, unit: 'g' },
        { name: 'Carbohydrates', amount: 38, unit: 'g' }
      ]
    }
  },
  {
    id: 1007,
    title: 'Beef Tacos',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    readyInMinutes: 25,
    servings: 4,
    summary: 'Seasoned ground beef in soft tortillas with fresh toppings.',
    cuisines: ['Mexican'],
    dishTypes: ['lunch', 'dinner'],
    diets: [],
    extendedIngredients: [
      { id: 21, name: 'ground beef', amount: 1, unit: 'lb', original: '1 lb ground beef' },
      { id: 22, name: 'taco seasoning', amount: 2, unit: 'tbsp', original: '2 tbsp taco seasoning' },
      { id: 23, name: 'tortillas', amount: 8, unit: 'pieces', original: '8 soft tortillas' },
      { id: 24, name: 'lettuce', amount: 2, unit: 'cups', original: '2 cups shredded lettuce' },
      { id: 25, name: 'tomato', amount: 2, unit: 'medium', original: '2 medium tomatoes, diced' },
      { id: 26, name: 'cheddar cheese', amount: 1, unit: 'cup', original: '1 cup shredded cheddar' }
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 380, unit: 'kcal' },
        { name: 'Protein', amount: 26, unit: 'g' },
        { name: 'Fat', amount: 18, unit: 'g' },
        { name: 'Carbohydrates', amount: 30, unit: 'g' }
      ]
    }
  },
  {
    id: 1008,
    title: 'Salmon with Roasted Vegetables',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    readyInMinutes: 30,
    servings: 2,
    summary: 'Pan-seared salmon fillet with colorful roasted seasonal vegetables.',
    cuisines: ['Mediterranean'],
    dishTypes: ['dinner'],
    diets: ['gluten free', 'dairy free'],
    extendedIngredients: [
      { id: 27, name: 'salmon fillet', amount: 2, unit: 'pieces', original: '2 salmon fillets (6 oz each)' },
      { id: 28, name: 'broccoli', amount: 2, unit: 'cups', original: '2 cups broccoli florets' },
      { id: 29, name: 'bell pepper', amount: 2, unit: 'medium', original: '2 bell peppers, sliced' },
      { id: 30, name: 'zucchini', amount: 1, unit: 'medium', original: '1 zucchini, sliced' },
      { id: 31, name: 'olive oil', amount: 3, unit: 'tbsp', original: '3 tbsp olive oil' },
      { id: 32, name: 'garlic', amount: 2, unit: 'cloves', original: '2 cloves garlic, minced' }
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 520, unit: 'kcal' },
        { name: 'Protein', amount: 42, unit: 'g' },
        { name: 'Fat', amount: 28, unit: 'g' },
        { name: 'Carbohydrates', amount: 24, unit: 'g' }
      ]
    }
  },
  {
    id: 1009,
    title: 'Mushroom Risotto',
    image: 'https://images.unsplash.com/photo-1476124369491-c4cc9b41e2a7?w=400',
    readyInMinutes: 40,
    servings: 4,
    summary: 'Creamy Italian rice dish with mixed mushrooms and parmesan cheese.',
    cuisines: ['Italian'],
    dishTypes: ['dinner'],
    diets: ['vegetarian', 'gluten free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 420, unit: 'kcal' },
        { name: 'Protein', amount: 14, unit: 'g' },
        { name: 'Fat', amount: 16, unit: 'g' },
        { name: 'Carbohydrates', amount: 56, unit: 'g' }
      ]
    }
  },
  {
    id: 1010,
    title: 'Chicken Stir Fry',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',
    readyInMinutes: 20,
    servings: 4,
    summary: 'Quick and healthy stir-fried chicken with colorful vegetables in savory sauce.',
    cuisines: ['Asian', 'Chinese'],
    dishTypes: ['dinner'],
    diets: ['dairy free'],
    extendedIngredients: [
      { id: 33, name: 'chicken breast', amount: 1.5, unit: 'lb', original: '1.5 lb chicken breast, sliced' },
      { id: 34, name: 'soy sauce', amount: 0.25, unit: 'cup', original: '1/4 cup soy sauce' },
      { id: 35, name: 'bell pepper', amount: 2, unit: 'medium', original: '2 bell peppers, sliced' },
      { id: 36, name: 'broccoli', amount: 2, unit: 'cups', original: '2 cups broccoli florets' },
      { id: 37, name: 'carrot', amount: 2, unit: 'medium', original: '2 carrots, sliced' },
      { id: 38, name: 'ginger', amount: 1, unit: 'tbsp', original: '1 tbsp fresh ginger, minced' },
      { id: 39, name: 'garlic', amount: 3, unit: 'cloves', original: '3 cloves garlic, minced' }
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 340, unit: 'kcal' },
        { name: 'Protein', amount: 32, unit: 'g' },
        { name: 'Fat', amount: 12, unit: 'g' },
        { name: 'Carbohydrates', amount: 28, unit: 'g' }
      ]
    }
  },
  {
    id: 1011,
    title: 'Quinoa Buddha Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    readyInMinutes: 25,
    servings: 2,
    summary: 'Nutritious bowl with quinoa, roasted chickpeas, avocado, and tahini dressing.',
    cuisines: ['Mediterranean'],
    dishTypes: ['lunch', 'dinner'],
    diets: ['vegan', 'gluten free', 'dairy free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 480, unit: 'kcal' },
        { name: 'Protein', amount: 18, unit: 'g' },
        { name: 'Fat', amount: 22, unit: 'g' },
        { name: 'Carbohydrates', amount: 58, unit: 'g' }
      ]
    }
  },
  {
    id: 1012,
    title: 'French Onion Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    readyInMinutes: 60,
    servings: 4,
    summary: 'Classic French soup with caramelized onions, beef broth, and melted cheese.',
    cuisines: ['French'],
    dishTypes: ['soup', 'appetizer'],
    diets: [],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 320, unit: 'kcal' },
        { name: 'Protein', amount: 16, unit: 'g' },
        { name: 'Fat', amount: 14, unit: 'g' },
        { name: 'Carbohydrates', amount: 32, unit: 'g' }
      ]
    }
  },
  {
    id: 1013,
    title: 'Blueberry Pancakes',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400',
    readyInMinutes: 20,
    servings: 4,
    summary: 'Fluffy pancakes studded with fresh blueberries, served with maple syrup.',
    cuisines: ['American'],
    dishTypes: ['breakfast', 'brunch'],
    diets: ['vegetarian'],
    extendedIngredients: [
      { id: 40, name: 'all-purpose flour', amount: 2, unit: 'cups', original: '2 cups all-purpose flour' },
      { id: 41, name: 'sugar', amount: 2, unit: 'tbsp', original: '2 tbsp sugar' },
      { id: 42, name: 'baking powder', amount: 2, unit: 'tsp', original: '2 tsp baking powder' },
      { id: 43, name: 'milk', amount: 1.5, unit: 'cups', original: '1.5 cups milk' },
      { id: 44, name: 'eggs', amount: 2, unit: 'large', original: '2 large eggs' },
      { id: 45, name: 'butter', amount: 4, unit: 'tbsp', original: '4 tbsp melted butter' },
      { id: 46, name: 'blueberries', amount: 1, unit: 'cup', original: '1 cup fresh blueberries' },
      { id: 47, name: 'maple syrup', amount: 0.5, unit: 'cup', original: '1/2 cup maple syrup' }
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 380, unit: 'kcal' },
        { name: 'Protein', amount: 10, unit: 'g' },
        { name: 'Fat', amount: 12, unit: 'g' },
        { name: 'Carbohydrates', amount: 58, unit: 'g' }
      ]
    }
  },
  {
    id: 1014,
    title: 'Caprese Salad',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400',
    readyInMinutes: 10,
    servings: 2,
    summary: 'Simple Italian salad with fresh mozzarella, tomatoes, basil, and balsamic.',
    cuisines: ['Italian'],
    dishTypes: ['salad', 'appetizer'],
    diets: ['vegetarian', 'gluten free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 280, unit: 'kcal' },
        { name: 'Protein', amount: 14, unit: 'g' },
        { name: 'Fat', amount: 20, unit: 'g' },
        { name: 'Carbohydrates', amount: 10, unit: 'g' }
      ]
    }
  },
  {
    id: 1015,
    title: 'Beef Burrito Bowl',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400',
    readyInMinutes: 30,
    servings: 4,
    summary: 'Deconstructed burrito with seasoned beef, rice, beans, and fresh toppings.',
    cuisines: ['Mexican'],
    dishTypes: ['lunch', 'dinner'],
    diets: ['gluten free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 620, unit: 'kcal' },
        { name: 'Protein', amount: 38, unit: 'g' },
        { name: 'Fat', amount: 24, unit: 'g' },
        { name: 'Carbohydrates', amount: 62, unit: 'g' }
      ]
    }
  },
  {
    id: 1016,
    title: 'Vegetable Pad Thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400',
    readyInMinutes: 25,
    servings: 4,
    summary: 'Thai rice noodles stir-fried with vegetables, peanuts, and tangy sauce.',
    cuisines: ['Thai', 'Asian'],
    dishTypes: ['dinner'],
    diets: ['vegan', 'dairy free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 420, unit: 'kcal' },
        { name: 'Protein', amount: 14, unit: 'g' },
        { name: 'Fat', amount: 16, unit: 'g' },
        { name: 'Carbohydrates', amount: 58, unit: 'g' }
      ]
    }
  },
  {
    id: 1017,
    title: 'Chicken Fajitas',
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400',
    readyInMinutes: 25,
    servings: 4,
    summary: 'Sizzling chicken and peppers with warm tortillas and fresh toppings.',
    cuisines: ['Mexican'],
    dishTypes: ['dinner'],
    diets: ['dairy free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 440, unit: 'kcal' },
        { name: 'Protein', amount: 36, unit: 'g' },
        { name: 'Fat', amount: 14, unit: 'g' },
        { name: 'Carbohydrates', amount: 42, unit: 'g' }
      ]
    }
  },
  {
    id: 1018,
    title: 'Tomato Basil Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    readyInMinutes: 30,
    servings: 4,
    summary: 'Creamy tomato soup with fresh basil, perfect with grilled cheese.',
    cuisines: ['American'],
    dishTypes: ['soup'],
    diets: ['vegetarian', 'gluten free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 180, unit: 'kcal' },
        { name: 'Protein', amount: 6, unit: 'g' },
        { name: 'Fat', amount: 8, unit: 'g' },
        { name: 'Carbohydrates', amount: 22, unit: 'g' }
      ]
    }
  },
  {
    id: 1019,
    title: 'Shrimp Scampi',
    image: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=400',
    readyInMinutes: 20,
    servings: 4,
    summary: 'Succulent shrimp in garlic butter sauce served over pasta.',
    cuisines: ['Italian'],
    dishTypes: ['dinner'],
    diets: ['dairy free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 480, unit: 'kcal' },
        { name: 'Protein', amount: 32, unit: 'g' },
        { name: 'Fat', amount: 18, unit: 'g' },
        { name: 'Carbohydrates', amount: 48, unit: 'g' }
      ]
    }
  },
  {
    id: 1020,
    title: 'Veggie Burger',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400',
    readyInMinutes: 25,
    servings: 4,
    summary: 'Hearty plant-based burger with black beans, quinoa, and spices.',
    cuisines: ['American'],
    dishTypes: ['lunch', 'dinner'],
    diets: ['vegetarian', 'vegan'],
    extendedIngredients: [
      { id: 48, name: 'black beans', amount: 1, unit: 'can', original: '1 can (15 oz) black beans, drained' },
      { id: 49, name: 'cooked quinoa', amount: 1, unit: 'cup', original: '1 cup cooked quinoa' },
      { id: 50, name: 'breadcrumbs', amount: 0.5, unit: 'cup', original: '1/2 cup breadcrumbs' },
      { id: 51, name: 'onion', amount: 1, unit: 'small', original: '1 small onion, diced' },
      { id: 52, name: 'garlic', amount: 2, unit: 'cloves', original: '2 cloves garlic, minced' },
      { id: 53, name: 'cumin', amount: 1, unit: 'tsp', original: '1 tsp cumin' },
      { id: 54, name: 'burger buns', amount: 4, unit: 'pieces', original: '4 burger buns' },
      { id: 55, name: 'lettuce', amount: 4, unit: 'leaves', original: '4 lettuce leaves' },
      { id: 56, name: 'tomato', amount: 1, unit: 'large', original: '1 large tomato, sliced' }
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 360, unit: 'kcal' },
        { name: 'Protein', amount: 16, unit: 'g' },
        { name: 'Fat', amount: 12, unit: 'g' },
        { name: 'Carbohydrates', amount: 48, unit: 'g' }
      ]
    }
  },
  {
    id: 1021,
    title: 'Chicken Noodle Soup',
    image: 'https://images.unsplash.com/photo-1588566565463-180a5b2090d2?w=400',
    readyInMinutes: 35,
    servings: 6,
    summary: 'Comforting homemade soup with tender chicken, vegetables, and egg noodles.',
    cuisines: ['American'],
    dishTypes: ['soup', 'dinner'],
    diets: ['dairy free'],
    extendedIngredients: [
      { id: 57, name: 'chicken breast', amount: 1, unit: 'lb', original: '1 lb chicken breast' },
      { id: 58, name: 'chicken broth', amount: 8, unit: 'cups', original: '8 cups chicken broth' },
      { id: 59, name: 'egg noodles', amount: 2, unit: 'cups', original: '2 cups egg noodles' },
      { id: 60, name: 'carrot', amount: 3, unit: 'medium', original: '3 carrots, sliced' },
      { id: 61, name: 'celery', amount: 3, unit: 'stalks', original: '3 celery stalks, sliced' },
      { id: 62, name: 'onion', amount: 1, unit: 'medium', original: '1 medium onion, diced' },
      { id: 63, name: 'garlic', amount: 3, unit: 'cloves', original: '3 cloves garlic, minced' },
      { id: 64, name: 'thyme', amount: 1, unit: 'tsp', original: '1 tsp dried thyme' },
      { id: 65, name: 'bay leaf', amount: 2, unit: 'leaves', original: '2 bay leaves' }
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 240, unit: 'kcal' },
        { name: 'Protein', amount: 22, unit: 'g' },
        { name: 'Fat', amount: 6, unit: 'g' },
        { name: 'Carbohydrates', amount: 26, unit: 'g' }
      ]
    }
  },
  {
    id: 1022,
    title: 'Eggplant Parmesan',
    image: 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=400',
    readyInMinutes: 50,
    servings: 4,
    summary: 'Breaded eggplant slices layered with marinara sauce and melted cheese.',
    cuisines: ['Italian'],
    dishTypes: ['dinner'],
    diets: ['vegetarian'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 420, unit: 'kcal' },
        { name: 'Protein', amount: 18, unit: 'g' },
        { name: 'Fat', amount: 22, unit: 'g' },
        { name: 'Carbohydrates', amount: 38, unit: 'g' }
      ]
    }
  },
  {
    id: 1023,
    title: 'Teriyaki Chicken Bowl',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    readyInMinutes: 30,
    servings: 4,
    summary: 'Glazed chicken with steamed rice and vegetables in sweet teriyaki sauce.',
    cuisines: ['Japanese', 'Asian'],
    dishTypes: ['dinner'],
    diets: ['dairy free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 520, unit: 'kcal' },
        { name: 'Protein', amount: 38, unit: 'g' },
        { name: 'Fat', amount: 14, unit: 'g' },
        { name: 'Carbohydrates', amount: 62, unit: 'g' }
      ]
    }
  },
  {
    id: 1024,
    title: 'Spinach and Feta Omelette',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
    readyInMinutes: 15,
    servings: 1,
    summary: 'Fluffy eggs filled with fresh spinach and tangy feta cheese.',
    cuisines: ['Mediterranean'],
    dishTypes: ['breakfast', 'brunch'],
    diets: ['vegetarian', 'gluten free'],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: 320, unit: 'kcal' },
        { name: 'Protein', amount: 24, unit: 'g' },
        { name: 'Fat', amount: 22, unit: 'g' },
        { name: 'Carbohydrates', amount: 8, unit: 'g' }
      ]
    }
  }
];
