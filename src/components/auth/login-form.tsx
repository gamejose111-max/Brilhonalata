'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const formSchema = z.object({
  email: z.string().email('Email inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: '',
        password: '',
        },
    });

    useEffect(() => {
        const redirectUrl = searchParams.get('redirectUrl') || '/admin';
        if (user && !isUserLoading) {
            router.replace(redirectUrl);
        }
    }, [user, isUserLoading, router, searchParams]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!auth) return;
        setIsLoading(true);
        
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            toast({
                title: 'Login bem-sucedido!',
                description: 'Redirecionando...',
            });
            // The useEffect will handle the redirect
        } catch (error: any) {
             toast({
                title: 'Erro de Login',
                description: 'Email ou senha inválidos.',
                variant: 'destructive',
            });
             console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    // While firebase is checking auth state, or if user is already logged in, show loading.
    if (isUserLoading || user) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Verificando acesso...</p>
            </div>
        )
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="seu@email.com" {...field} type="email" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                    <Input placeholder="••••••••" {...field} type="password" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Entrar
            </Button>
        </form>
        </Form>
    );
}
