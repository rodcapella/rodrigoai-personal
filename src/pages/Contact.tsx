import { lazy, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';

const AlertCircle = lazy(() =>
	import('lucide-react').then((m) => ({ default: m.AlertCircle })),
);

interface ContactProps {
	theme?: 'dark' | 'light';
	onToggleTheme?: () => void;
}

interface FormData {
	name: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	phone?: string;
	subject?: string;
	message?: string;
}

const Contact = ({ theme = 'dark', onToggleTheme }: ContactProps) => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const validateForm = () => {
		const newErrors: FormErrors = {};

		if (!formData.name.trim()) newErrors.name = 'Name is required';
		if (!formData.email.trim()) newErrors.email = 'Email is required';
		else if (!emailRegex.test(formData.email))
			newErrors.email = 'Invalid email';

		if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
		if (!formData.message.trim()) newErrors.message = 'Message is required';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e: React.ChangeEvent<any>) => {
		const name = e.target.name;
		const value = e.target.value;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: undefined,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		try {
			await fetch('/api/contact', {
				method: 'POST',
				body: JSON.stringify(formData),
			});

			setFormData({
				name: '',
				email: '',
				phone: '',
				subject: '',
				message: '',
			});
		} catch (err) {
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<MainLayout theme={theme} onToggleTheme={onToggleTheme}>
			<PageHero
				variant="page"
				title="LET'S CONNECT"
				subtitle="Feel free to reach out for collaborations or projects."
				image="/rodrigo_contact_image.png"
			/>

			<PageSection>
				<div className="max-w-2xl mx-auto">
					<motion.form
						onSubmit={handleSubmit}
						className="space-y-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						{/* Name */}
						<div>
							<input
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Full Name"
								className="w-full p-3 rounded-lg border"
							/>

							{errors.name && (
								<p className="text-red-500 text-sm flex gap-1 mt-1">
									<AlertCircle className="w-4 h-4" />
									{errors.name}
								</p>
							)}
						</div>

						{/* Email */}
						<div>
							<input
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Email"
								className="w-full p-3 rounded-lg border"
							/>

							{errors.email && (
								<p className="text-red-500 text-sm flex gap-1 mt-1">
									<AlertCircle className="w-4 h-4" />
									{errors.email}
								</p>
							)}
						</div>

						{/* Subject */}
						<div>
							<input
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								placeholder="Subject"
								className="w-full p-3 rounded-lg border"
							/>

							{errors.subject && (
								<p className="text-red-500 text-sm flex gap-1 mt-1">
									<AlertCircle className="w-4 h-4" />
									{errors.subject}
								</p>
							)}
						</div>

						{/* Message */}
						<div>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								placeholder="Message"
								className="w-full p-3 rounded-lg border"
							/>

							{errors.message && (
								<p className="text-red-500 text-sm flex gap-1 mt-1">
									<AlertCircle className="w-4 h-4" />
									{errors.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full py-3 bg-primary text-white rounded-lg"
						>
							{isSubmitting ? 'Sending...' : 'Send Message'}
						</button>
					</motion.form>
				</div>
			</PageSection>
		</MainLayout>
	);
};

export default Contact;
