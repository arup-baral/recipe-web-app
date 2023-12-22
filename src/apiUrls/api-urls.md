
# Get meals using query, page, limit
/api/v1/public/meals?page=${pageNo}&limit=${limit}&query=${query}

# Get 20 random meals
/api/v1/public/meals/meal/meals

# Search meal by name
https://www.themealdb.com/api/json/v1/1/search.php?s=${query}

# List all meals by first letter
https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}

# Lookup full meal details by id
https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}

# Lookup a single random meal
https://www.themealdb.com/api/json/v1/1/random.php

# List all meal categories
https://www.themealdb.com/api/json/v1/1/categories.php

# List all Categories, Area, Ingredients
https://www.themealdb.com/api/json/v1/1/list.php?c=list
https://www.themealdb.com/api/json/v1/1/list.php?a=list
https://www.themealdb.com/api/json/v1/1/list.php?i=list

# Filter by main ingredient
https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

# Filter by Category
https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}

# Filter by Area
https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}