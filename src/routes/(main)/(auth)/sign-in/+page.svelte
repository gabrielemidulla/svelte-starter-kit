<script>
	import { enhance } from '$app/forms';
	import { Button } from "@/components/ui/button"
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
	import { Checkbox } from "@/components/ui/checkbox"
	import { Input } from "@/components/ui/input"
	import { Label } from "@/components/ui/label"
	import { Github, Twitter } from 'lucide-svelte';
	import { toast } from "svelte-sonner";

	let { form } = $props();

	$effect(() => {
		if (form?.message) {
			toast.error(form.message, {
				position: "top-center"
			});
		}
	});

</script>


<div class="flex items-center justify-center min-h-screen p-4 bg-gray-100">
	<Card class="w-full max-w-md shadow-lg">
	  <CardHeader class="space-y-1">
		<CardTitle class="text-2xl font-bold text-center">Sign In</CardTitle>
		<CardDescription class="text-center">
		  Enter your email and password to access your account
		</CardDescription>
	  </CardHeader>
	  <CardContent>
		<form method="post" action="?/signIn" use:enhance>
		  <div class="space-y-4">
			<div class="space-y-2">
			  <Label htmlFor="email">Email</Label>
			  <Input 
				id="email" 
				type="email" 
				name="email"
				placeholder="m@example.com" 
				required 
				class="w-full px-3 py-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
			  />
			</div>
			<div class="space-y-2">
			  <Label htmlFor="password">Password</Label>
			  <Input 
				id="password" 
				type="password" 
				name="password"
				required
				class="w-full px-3 py-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
			  />
			</div>
			<div class="flex items-center space-x-2">
			  <Checkbox id="remember" />
			  <label
				for="remember"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			  >
				Remember me
			  </label>
			</div>
			<Button type="submit" class="w-full text-white transition bg-purple-600 shadow-md hover:bg-purple-700 hover:shadow-lg">
			  Sign in
			</Button>
		  </div>
		</form>
		<div class="mt-4 text-sm text-center">
		  <a href="#" class="text-purple-600 hover:underline">Forgot password?</a>
		</div>
		<div class="relative my-4">
		  <div class="absolute inset-0 flex items-center">
			<span class="w-full border-t"></span>
		  </div>
		  <div class="relative flex justify-center text-xs uppercase">
			<span class="px-2 text-gray-500 bg-white">Or continue with</span>
		  </div>
		</div>
		<div class="flex space-x-4">
		  <Button variant="outline" class="w-full transition shadow-sm hover:shadow-md">
			<Github class="w-4 h-4 mr-2" />
			Github
		  </Button>
		  <Button variant="outline" class="w-full transition shadow-sm hover:shadow-md">
			<Twitter class="w-4 h-4 mr-2" />
			Twitter
		  </Button>
		</div>
	  </CardContent>
	  <CardFooter class="text-sm text-center text-gray-600">
		Don't have an account? <a href="/sign-up" class="mx-1 text-purple-600 hover:underline">Sign up</a>
	  </CardFooter>
	</Card>
</div>