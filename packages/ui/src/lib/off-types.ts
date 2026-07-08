export interface Nutriments {
  energy_kcal_100g?: number;
  proteins_100g?: number;
  carbohydrates_100g?: number;
  sugars_100g?: number;
  fat_100g?: number;
  saturated_fat_100g?: number;
  fiber_100g?: number;
  sodium_100g?: number;
  salt_100g?: number;
  [key: string]: number | undefined;
}

export interface OFFProduct {
  code: string;
  product_name: string;
  product_name_en?: string;
  brands?: string;
  categories?: string;
  categories_tags?: string[];
  image_url?: string;
  image_front_url?: string;
  image_front_small_url?: string;
  nutriscore_grade?: string;
  ecoscore_grade?: string;
  nova_group?: number;
  nutriments?: Nutriments;
  ingredients_text?: string;
  ingredients_text_en?: string;
  allergens?: string;
  allergens_tags?: string[];
  allergens_hierarchy?: string[];
  additives_tags?: string[];
  additives_original_tags?: string[];
  labels?: string;
  labels_tags?: string[];
  serving_size?: string;
  serving_quantity?: number;
  quantity?: string;
  packaging?: string;
  countries?: string;
  stores?: string;
}
