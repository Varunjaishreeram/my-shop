import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteProduct } from "@/app/actions/admin";
import { Edit, Trash2, Plus, AlertCircle } from "lucide-react";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif text-emerald-950">Products</h1>
                <Button asChild className="bg-emerald-900 hover:bg-emerald-800 text-white rounded-full px-6">
                    <Link href="/admin/products/new"><Plus className="mr-2 h-4 w-4" /> Add Product</Link>
                </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <Table>
                    <TableHeader className="bg-stone-50">
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <img src={product.img} alt={product.name} className="w-12 h-12 object-contain rounded-md bg-stone-50 border border-stone-100" />
                                </TableCell>
                                <TableCell className="font-medium text-emerald-900">{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>
                                    {product.stock < 10 ? (
                                        <span className="text-red-600 flex items-center gap-1 font-bold text-xs"><AlertCircle size={12} /> {product.stock}</span>
                                    ) : (
                                        <span className="text-stone-600">{product.stock}</span>
                                    )}
                                </TableCell>
                                <TableCell>₹{product.price}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <Button asChild size="sm" variant="outline" className="h-8 w-8 p-0">
                                        <Link href={`/admin/products/${product.id}`}><Edit size={14} className="text-stone-600" /></Link>
                                    </Button>
                                    <form action={async () => {
                                        "use server";
                                        await deleteProduct(product.id);
                                    }}>
                                        <Button size="sm" variant="destructive" className="h-8 w-8 p-0 bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                                            <Trash2 size={14} />
                                        </Button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}