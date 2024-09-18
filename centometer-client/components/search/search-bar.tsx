import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const formSchema = z.object({
    query: z.string(),
});

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const params = new URLSearchParams(searchParams);

        params.set("results", values.query);
        const queryString = params.toString();
        const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(updatedPath);
    };

    return (
        <>
            <Form {...form}>
                <div className="w-full flex flex-col items-center justify-center h-1/3 ">
                    <h1 className="text-3xl font-semibold mb-4 ">Search</h1>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex max-w-sm items-center space-x-1"
                    >
                        <FormField
                            control={form.control}
                            name="query"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter a company name or symbol"
                                            className="rounded-l-3xl rounded-r-none outline-none md:w-80 w-64"
                                            autoComplete="off"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button className="h-10 rounded-r-3xl rounded-l-none" type="submit">
                            <Search />
                        </Button>
                    </form>
                </div>
            </Form>
        </>
    );
}
