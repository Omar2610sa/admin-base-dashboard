import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


import pattern from "@/assets/patterns/386289221_1854faaa-ed45-4a79-a0a4-42e6d3d70c76.jpg"
import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"


// Alerts
import { SuccessAlert } from "@/components/Alerts/SuccessAlert"
import { UnSuccessAlert } from "@/components/Alerts/UnSuccessAlert"


// Apir
import api from "@/APis/Axios"

import logo from "@/assets/logoo.png"



export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/dashboard/admin/login', {
                email,
                password
            });

            const token = response.data.data.token;
            localStorage.setItem('token_bablyon', token);

            SuccessAlert("Signed in successfully");
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            UnSuccessAlert();
        } finally {
            setLoading(false);
        }
    };

    const token = localStorage.getItem("token_bablyon")

    if (token) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit} className="p-6 md:p-12">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-4xl text-sidebar-accent font-bold">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">
                                    Login to your Bablyon  Dashboard
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className=" focus-visible:ring-sidebar-accent/60 p-3"
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>

                                </div>
                                <Input id="password" type="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className=" focus-visible:ring-sidebar-accent/60 p-3"
                                    required />
                            </Field>
                            <Field>
                                <Button
                                    disabled={loading}
                                    className="bg-sidebar-accent"
                                    type="submit">Login</Button>
                            </Field>


                        </FieldGroup>
                    </form>
                    <div className="h-full bg-sidebar-accent relative hidden md:block">
                        <div className="flex justify-center items-center  h-full ">
                            <img src={logo} className="brightness-[100]"/>
                            <img src={pattern} className="absolute  left-0 w-full h-full object-cover opacity-20" />
                        </div>

                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
