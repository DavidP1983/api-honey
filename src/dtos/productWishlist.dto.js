export const toWishlistProductDto = (product) => ({
    _id: product._id.toString(),
    title: product.title,
    images: product.images,
    variants: product.variants,
});
