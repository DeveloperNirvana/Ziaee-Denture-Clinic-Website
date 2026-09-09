export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export async function submitContactForm(
  formId: number,
  form: ContactFormData
) {
  const formData = new FormData();

formData.append("_wpcf7_unit_tag", `wpcf7-f${formId}-p0-o1`);

formData.append("full-name", form.fullName);
formData.append("phone", form.phone);
formData.append("email", form.email);
formData.append("service", form.service);
formData.append("message", form.message);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
}