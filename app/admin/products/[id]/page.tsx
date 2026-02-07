import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/ProductForm";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditProductPage(props: Props) {
    const params = await props.params;
    const product = await prisma.product.findUnique({ where: { id: params.id } });

    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <h1 className="text-3xl font-serif text-emerald-950 mb-8">Edit Remedy</h1>
            <ProductForm product={product} />
        </div>
    );
}