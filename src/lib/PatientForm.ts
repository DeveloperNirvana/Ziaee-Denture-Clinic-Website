export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  message: string;
}

export async function submitPatientForm(
  formId: number,
  form: ContactFormData
) {
  const formData = new FormData();

  formData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p0-o1`);

  formData.append('full-name', form.fullName);
  formData.append('phone', form.phone);
  formData.append('email', form.email);
  formData.append('address', form.address);
  formData.append('city', form.city);
  formData.append('postal-code', form.postalCode);
  formData.append('message', form.message);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return response.json();
}