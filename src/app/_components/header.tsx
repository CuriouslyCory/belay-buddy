import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export default function Header() {
	return (
		<div className="w-full">
			<header className="flex items-center p-4">
				<div className="ml-auto flex items-center gap-2">
					<ThemeToggle />
					<SignedOut>
						<SignInButton />
						<SignUpButton>
							<Button className="h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 font-medium text-sm sm:h-12 sm:px-5 sm:text-base">
								Sign Up
							</Button>
						</SignUpButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</header>
			<div className="mb-12 flex flex-col items-center justify-center">
				<h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
					Belay <span className="text-[hsl(280,100%,70%)]">Buddy</span>
				</h1>
			</div>
		</div>
	);
}
