export const config = {
     cloudinaryUploadPreset: String(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET),
     appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
     appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
     appwriteApiKey: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
     appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
     appwriteProductsCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID),
     appwriteProductCategoriesCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_CATEGORIES_COLLECTION_ID),
     appwriteProductBrandsCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_BRANDS_COLLECTION_ID),
      appwriteProductTypesCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_TYPES_COLLECTION_ID),
       appwriteProductUnitsCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_UNITS_COLLECTION_ID),
}
