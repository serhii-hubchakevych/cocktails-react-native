class CocktailsService {
  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`);
    }
    return await res.json();
  }

  async getAllCategory() {
    const res = await this.getResource(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    );
    return res.drinks;
  }

  async getDrinksListFromCategory(categoryName) {
    const res = await this.getResource(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`,
    );
    return res.drinks;
  }
}

export {CocktailsService};
