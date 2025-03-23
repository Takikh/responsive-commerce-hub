
import { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBag, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
});

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await resetPassword(data.email);
      setIsSuccess(true);
    } catch (error) {
      console.error("Password reset failed:", error);
      // Toast is handled in the resetPassword function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-sm border">
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-primary hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Retour à la connexion
          </Link>
          <div className="flex justify-center">
            <ShoppingBag className="h-12 w-12 text-primary mb-2" />
          </div>
          <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Entrez votre email pour réinitialiser votre mot de passe
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-lg font-medium">Email envoyé</h2>
            <p className="text-sm text-muted-foreground">
              Si un compte existe avec cet email, vous recevrez un lien pour réinitialiser votre mot de passe.
            </p>
            <Button asChild className="mt-4">
              <Link to="/login">Retour à la connexion</Link>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="votremail@exemple.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Réinitialiser le mot de passe"
                )}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
