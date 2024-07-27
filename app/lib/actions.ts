'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

Amplify.configure(outputs);


const client = generateClient<Schema>();

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });


export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// INVOICE ACTIONS

export async function createInvoice(prevState: State, formData: FormData) {
  console.log('Creating invoice...');
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('Validation failed:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await client.models.Invoice.create({
      customer_id: customerId,
      amount: amountInCents,
      status: status, 
      date: date,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    }; 
}

  // Revalidate the cache for the invoices page and redirect the user.
  console.log("created invoice")
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  
  id: string,
  prevState: State,
  formData: FormData,
)
 {
  let redirectPath: string | null = null

  // Validate form using Zod
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    // Fetch the existing invoice
    const invoiceResponse = await client.models.Invoice.get({ id });
    const invoiceData = invoiceResponse.data;
    const invoiceErrors = invoiceResponse.errors;

    if (invoiceErrors || !invoiceData) {
      throw new Error('Error fetching invoice data.');
    }

    // Update the invoice
    await client.models.Invoice.update({
      id: id,
      customer_id: customerId,
      amount: amountInCents,
      status: status, // Assuming status is a boolean in your schema
      date: invoiceData.date, // Keep the original date
    });
      // Revalidate the cache for the invoices page and redirect the user.
      redirectPath = `/dashboard/invoices`;
    }  catch (error) {
      console.error('Database Error:', error);
      return {
        message: 'Database Error: Failed to Create Invoice.',
      }; 
  }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

export async function deleteInvoice(id: string) {
  let redirectPath: string | null = null

  try {
    // Delete the invoice
    await client.models.Invoice.delete({ id });
      // Revalidate the cache for the invoices page and redirect the user.
      redirectPath = `/dashboard/invoices`;
    } catch (error) {
      console.error('Database Error:', error);
      return {
        message: 'Database Error: Failed to Create Invoice.',
      }; 
  }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }


// SUPPLIER ACTIONS

const SupplierFormSchema = z.object({
  id: z.string(),
  supplierName: z.string({
    invalid_type_error: 'Please enter a supplier name.',
  }),
  supplierEmail: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  supplierPhone: z.string({
    invalid_type_error: 'Please enter a valid phone number.',
  }),
  supplierAddress: z.string({
    invalid_type_error: 'Please enter a valid address.',
  }),
  oStatus: z.enum(['active', 'inactive'], {
    invalid_type_error: 'Please select a status.',
  }),
  pStatus: z.enum(['pending', 'processed'], {
    invalid_type_error: 'Please select a payment status.',
  }),
  date: z.string(),
});

const CreateSupplier = SupplierFormSchema.omit({ id: true, date: true });
const UpdateSupplier = SupplierFormSchema.omit({ id: true, date: true });

export type SState = {
  errors?: {
    supplierName?: string[];
    supplierEmail?: string[];
    supplierPhone?: string[];
    supplierAddress?: string[];
    oStatus?: string[];
    pStatus?: string[];
  };
  message?: string | null;
};

export async function createSupplier(prevState: SState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateSupplier.safeParse({
    supplierName: formData.get('supplierName'),
    supplierEmail: formData.get('supplierEmail'),
    supplierPhone: formData.get('supplierPhone'),
    supplierAddress: formData.get('supplierAddress'),
    oStatus: formData.get('oStatus'),
    pStatus: formData.get('pStatus'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Supplier.',
    };
  }

  // Prepare data for insertion into the database
  const { supplierName, supplierEmail, supplierPhone, supplierAddress, oStatus, pStatus } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await client.models.Suppliers.create({
      name: supplierName,
      email: supplierEmail,
      phone: supplierPhone,
      address: supplierAddress,
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Supplier.',
    };
  }

  // Revalidate the cache for the suppliers page and redirect the user.
  revalidatePath('/dashboard/suppliers');
  redirect('/dashboard/suppliers');
}


export async function updateSupplier(
  id: string,
  prevState: SState,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = UpdateSupplier.safeParse({
    supplierName: formData.get('supplierName'),
    supplierEmail: formData.get('supplierEmail'),
    supplierPhone: formData.get('supplierPhone'),
    supplierAddress: formData.get('supplierAddress'),
    oStatus: formData.get('oStatus'),
    pStatus: formData.get('pStatus'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Supplier.',
    };
  }

  const { supplierName, supplierEmail, supplierPhone, supplierAddress, oStatus, pStatus } = validatedFields.data;

  try {
    // Fetch the existing supplier
    const supplierResponse = await client.models.Suppliers.get({ id });
    const supplierData = supplierResponse.data;
    const supplierErrors = supplierResponse.errors;

    if (supplierErrors || !supplierData) {
      throw new Error('Error fetching supplier data.');
    }

    // Update the supplier
    await client.models.Suppliers.update({
      id: id,
      name: supplierName,
      email: supplierEmail,
      phone: supplierPhone,
      address: supplierAddress,
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Supplier.' };
  }

  revalidatePath('/dashboard/suppliers');
  redirect('/dashboard/suppliers');
}

export async function deleteSupplier(id: string) {
  try {
    // Delete the supplier
    await client.models.Suppliers.delete({ id });
    revalidatePath('/dashboard/suppliers');
    return { message: 'Deleted Supplier.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Supplier.' };
  }
}

// const FormSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: 'Please select a customer.',
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: 'Please enter an amount greater than $0.' }),
//   status: z.enum(['pending', 'paid'], {
//     invalid_type_error: 'Please select an invoice status.',
//   }),
//   date: z.string(),
// });




//apple actions

const AppleVarietySchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name.'
  }),
  description: z.string({
    invalid_type_error: 'Please enter a description.'
  }),
  harvest_season: z.string({
    invalid_type_error: 'Please enter a harvest season.'
  }),
});

const CreateAppleVariety = AppleVarietySchema.omit({ id: true });
const UpdateAppleVariety = AppleVarietySchema.omit({ id: true });

export type AppleVarietyState = {
  errors?: {
    name?: string[];
    description?: string[];
    harvest_season?: string[];
  };
  message?: string | null;
};

// Apple Actions

export async function createAppleVariety(prevState: AppleVarietyState, formData: FormData) {
  const validatedFields = CreateAppleVariety.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    harvest_season: formData.get('harvest_season'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Apple Variety.',
    };
  }

  const { name, description, harvest_season } = validatedFields.data;

  try {
    await client.models.AppleVarieties.create({
      name: name,
      description: description,
      harvest_season: harvest_season,
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Apple Variety.',
    };
  }

  revalidatePath('/dashboard/apple-varieties');
  redirect('/dashboard/apple-varieties');
}

export async function updateAppleVariety(id: string, prevState: AppleVarietyState, formData: FormData) {
  const validatedFields = UpdateAppleVariety.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    harvest_season: formData.get('harvest_season'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Apple Variety.',
    };
  }

  const { name, description, harvest_season } = validatedFields.data;

  try {
    await client.models.AppleVarieties.update({
      id: id,
      name: name,
      description: description,
      harvest_season: harvest_season,
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Apple Variety.' };
  }

  revalidatePath('/dashboard/apple-varieties');
  redirect('/dashboard/apple-varieties');
}

export async function deleteAppleVariety(id: string) {
  try {
    await client.models.AppleVarieties.delete({ id });
    revalidatePath('/dashboard/apple-varieties');
    return { message: 'Deleted Apple Variety.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Apple Variety.' };
  }
}

// Harvest Records Schema
const HarvestRecordSchema = z.object({
  id: z.string(),
  apple_variety_id: z.string({
    invalid_type_error: 'Please select an apple variety.'
  }),
  quantity: z.number().int().positive({ message: 'Please enter a positive quantity.' }),
  quality: z.string().nonempty({ message: 'Please enter a quality rating.' }),
  harvest_date: z.string().nonempty({ message: 'Please enter a harvest date.' }),
});

const CreateHarvestRecord = HarvestRecordSchema.omit({ id: true });
const UpdateHarvestRecord = HarvestRecordSchema.omit({ id: true });

export type HarvestRecordState = {
  errors?: {
    apple_variety_id?: string[];
    quantity?: string[];
    quality?: string[];
    harvest_date?: string[];
  };
  message?: string | null;
};

export async function createHarvestRecord(prevState: HarvestRecordState, formData: FormData) {
  const validatedFields = CreateHarvestRecord.safeParse({
    apple_variety_id: formData.get('apple_variety_id'),
    quantity: Number(formData.get('quantity')),
    quality: formData.get('quality'),
    harvest_date: formData.get('harvest_date'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Harvest Record.',
    };
  }

  const { apple_variety_id, quantity, quality, harvest_date } = validatedFields.data;

  try {
    await client.models.HarvestRecords.create({
      apple_variety_id: apple_variety_id,
      quantity: quantity,
      quality: quality,
      harvest_date: harvest_date,
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Harvest Record.',
    };
  }

  revalidatePath('/dashboard/harvest-records');
  redirect('/dashboard/harvest-records');
}

export async function updateHarvestRecord(id: string, prevState: HarvestRecordState, formData: FormData) {
  const validatedFields = UpdateHarvestRecord.safeParse({
    apple_variety_id: formData.get('apple_variety_id'),
    quantity: Number(formData.get('quantity')),
    quality: formData.get('quality'),
    harvest_date: formData.get('harvest_date'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Harvest Record.',
    };
  }

  const { apple_variety_id, quantity, quality, harvest_date } = validatedFields.data;

  try {
    await client.models.HarvestRecords.update({
      id: id,
      apple_variety_id: apple_variety_id,
      quantity: quantity,
      quality: quality,
      harvest_date: harvest_date,
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Harvest Record.' };
  }

  revalidatePath('/dashboard/harvest-records');
  redirect('/dashboard/harvest-records');
}

export async function deleteHarvestRecord(id: string) {
  try {
    await client.models.HarvestRecords.delete({ id });
    revalidatePath('/dashboard/harvest-records');
    return { message: 'Deleted Harvest Record.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Harvest Record.' };
  }
}
