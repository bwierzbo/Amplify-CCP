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



// INVOICE ACTIONS

const InvoiceFormSchema = z.object({
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

const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceFormSchema.omit({ date: true, id: true });

export type InvoiceState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: InvoiceState, formData: FormData) {
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
  revalidatePath('/dashboard/sales/invoices');
  redirect('/dashboard/sales/invoices');
};

export async function updateInvoice(
  
  id: string,
  prevState: InvoiceState,
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
      redirectPath = `/dashboard/sales/invoices`;
    }  catch (error) {
      console.error('Database Error:', error);
      return {
        message: 'Database Error: Failed to Create Invoice.',
      }; 
  }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/sales/invoices');
    redirect('/dashboard/sales/invoices');
};

export async function deleteInvoice(id: string) {
  let redirectPath: string | null = null

  try {
    // Delete the invoice
    await client.models.Invoice.delete({ id });
      // Revalidate the cache for the invoices page and redirect the user.
      redirectPath = `/dashboard/sales/invoices`;
    } catch (error) {
      console.error('Database Error:', error);
      return {
        message: 'Database Error: Failed to Create Invoice.',
      }; 
  }
  
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/sales/invoices');
    redirect('/dashboard/sales/invoices');
};

// CUSTOMER ACTIONS

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a customer name.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

const CreateCustomer = CustomerFormSchema.omit({ id: true });
const UpdateCustomer = CustomerFormSchema.omit({ id: true });

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function createCustomer(prevState: CustomerState, formData: FormData) {
  console.log('Creating customer...');

  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }

  const { name, email } = validatedFields.data;

  try {
    await client.models.Customer.create({
      name,
      email,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  }

  revalidatePath('/dashboard/sales/customers');
  redirect('/dashboard/sales/customers');
};

export async function updateCustomer(id: string, prevState: CustomerState, formData: FormData) {
  console.log('Updating customer...');

  const validatedFields = UpdateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Customer.',
    };
  }

  const { name, email } = validatedFields.data;

  try {
    await client.models.Customer.update({
      id,
      name,
      email,

    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Update Customer.',
    };
  }

  revalidatePath('/dashboard/sales/customers');
  redirect('/dashboard/sales/customers');
};

export async function deleteCustomer(id: string) {
  try {
    await client.models.Customer.delete({ id });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Delete Customer.',
    };
  }

  revalidatePath('/dashboard/sales/customers');
};



// SUPPLIER ACTIONS

const SupplierFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a supplier name.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string({
    invalid_type_error: 'Please enter a valid phone number.',
  }),
  address: z.string({
    invalid_type_error: 'Please enter a valid address.',
  }),
  type: z.array(z.enum(['apples', 'additives', 'packaging', 'other']), {
    invalid_type_error: 'Please select at least one type.',
  }).nonempty('Please select at least one type.'),
});

const CreateSupplier = SupplierFormSchema.omit({ id: true});
const UpdateSupplier = SupplierFormSchema.omit({ id: true});

export type SupplierState = {
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    address?: string[];
    type?: string[];
  };
  message?: string | null;
};

export async function createSupplier(prevState: SupplierState, formData: FormData) {
  const validatedFields = CreateSupplier.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    type: ['apples', 'additives', 'packaging', 'other'].filter(
      type => formData.get(`type_${type}`) === 'on'
    ),
  });

  if (!validatedFields.success) {
    console.log('Validation failed:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Supplier.',
    };
  }

  const { name, email, phone, address, type } = validatedFields.data;

  try {
    await client.models.Suppliers.create({
       name: name, 
       email: email, 
       phone: phone, 
       address: address,
       type: type,
       });
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create Supplier.' };
  }
  revalidatePath('/dashboard/production/suppliers');
  redirect('/dashboard/production/suppliers');
};

export async function updateSupplier(
  id: string,
  prevState: SupplierState,
  formData: FormData,
) {
  const validatedFields = UpdateSupplier.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    type: formData.getAll('type'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Supplier.',
    };
  }

  const { name, email, phone, address, type } = validatedFields.data;

  try {
    await client.models.Suppliers.update({
      id: id,
      name: name,
      email: email,
      phone: phone,
      address: address,
      type: type,
    });
  } catch (error) {
    return { message: 'Database Error: Failed to Update Supplier.' };
  }

  revalidatePath('/dashboard/production/suppliers');
  redirect('/dashboard/production/suppliers');
};

export async function deleteSupplier(id: string) {
  try {
    // Delete the supplier
    await client.models.Suppliers.delete({ id });
    revalidatePath('/dashboard/production/suppliers');
    return { message: 'Deleted Supplier.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Supplier.' };
  }
};

// ITEM ACTIONS

const ItemFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter an item name.',
  }),
  supplier_type: z.string().optional(),
  supplier_id: z.string().optional(),
  quantity: z.coerce
    .number()
    .int()
    .gte(0, { message: 'Quantity cannot be negative.' }),
  uom: z.string({
    invalid_type_error: 'Please enter a unit of measurement.',
  }),
  price: z.coerce
    .number()
    .gte(0, { message: 'Please enter a price greater than or equal to $0.' }),
});

const CreateItem = ItemFormSchema.omit({ id: true });
const UpdateItem = ItemFormSchema.omit({ id: true });

export type ItemState = {
  errors?: {
    name?: string[];
    supplier_type?: string[];
    supplier_id?: string[];
    quantity?: string[];
    uom?: string[];
    price?: string[];
  };
  message?: string | null;
};

export async function createItem(prevState: ItemState, formData: FormData) {
  const validatedFields = CreateItem.safeParse({
    name: formData.get('name'),
    supplier_type: formData.get('supplier_type'),
    supplier_id: formData.get('supplier_id'),
    quantity: formData.get('quantity'),
    uom: formData.get('uom'),
    price: formData.get('price'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Item.',
    };
  }

  const { name, supplier_type, supplier_id, quantity, uom, price } = validatedFields.data;
  const priceInCents = Math.round(Number(price) * 100);

  try {
    const newItem = await client.models.Item.create({
      name,
      supplier_type,
      supplier_id,
      quantity,
      uom,
      price: priceInCents,
    });

    if (supplier_type === 'apples' && newItem.data && newItem.data.id) {
      await client.models.AppleItemDetails.create({
        item_id: newItem.data.id,
        organic_grown: formData.get('organicGrown') === 'true',
        pesticides_used: formData.get('pesticidesUsed') === 'true',
        pesticide_type: formData.get('pesticideType') as string,
        last_pesticide_date: formData.get('lastPesticideDate') as string,
        animals_in_orchard: formData.get('animalsInOrchard') === 'true',
      });
    }
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Item.',
    };
  }

  revalidatePath('/dashboard/production/inventory');
  redirect('/dashboard/production/inventory');
};

export async function updateItem(id: string, prevState: ItemState, formData: FormData) {
  const validatedFields = UpdateItem.safeParse({
    name: formData.get('name'),
    supplier_type: formData.get('supplier_type'),
    supplier_id: formData.get('supplier_id'),
    quantity: formData.get('quantity'),
    uom: formData.get('uom'),
    price: formData.get('price'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Item.',
    };
  }

  const { name, supplier_type, supplier_id, quantity, uom, price } = validatedFields.data;
  const priceInCents = Math.round(Number(price) * 100);

  try {
    await client.models.Item.update({
      id: id,
      name: name,
      supplier_type: supplier_type,
      supplier_id: supplier_id,
      quantity: quantity,
      uom: uom,
      price: priceInCents,
    });

    if (supplier_type === 'apples') {
      const appleDetails = await client.models.AppleItemDetails.get({ id });
      if (appleDetails.data) {
        await client.models.AppleItemDetails.update({
          id: appleDetails.data.id,
          organic_grown: formData.get('organicGrown') === 'true',
          pesticides_used: formData.get('pesticidesUsed') === 'true',
          pesticide_type: formData.get('pesticideType') as string,
          last_pesticide_date: formData.get('lastPesticideDate') as string,
          animals_in_orchard: formData.get('animalsInOrchard') === 'true',
        });
      } else {
        await client.models.AppleItemDetails.create({
          item_id: id,
          organic_grown: formData.get('organicGrown') === 'true',
          pesticides_used: formData.get('pesticidesUsed') === 'true',
          pesticide_type: formData.get('pesticideType') as string,
          last_pesticide_date: formData.get('lastPesticideDate') as string,
          animals_in_orchard: formData.get('animalsInOrchard') === 'true',
        });
      }
    }
  } catch (error) {
    return { message: 'Database Error: Failed to Update Item.' };
  }

  revalidatePath('/dashboard/production/inventory');
  redirect('/dashboard/production/inventory');
};

export async function deleteItem(id: string) {
  try {
    // First, check if this is an apple item and delete its details if it exists
    const item = await client.models.Item.get({ id });
    if (item.data && item.data.supplier_type === 'apples') {
      const appleDetails = await client.models.AppleItemDetails.get({ id });
      if (appleDetails.data) {
        await client.models.AppleItemDetails.delete({ id: appleDetails.data.id });
      }
    }

    // Now delete the item itself
    await client.models.Item.delete({ id });
    revalidatePath('/dashboard/production/inventory');
    return { message: 'Deleted Item.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Delete Item.' };
  }
};



//APPLE ACTIONS

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
};

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
};

export async function deleteAppleVariety(id: string) {
  try {
    await client.models.AppleVarieties.delete({ id });
    revalidatePath('/dashboard/apple-varieties');
    return { message: 'Deleted Apple Variety.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Apple Variety.' };
  }
};

export async function updateTreeStatus(id: string, status: 'healthy' | 'diseased' | 'treated' | 'removed') {
  try {
    await client.models.Tree.update({
      id: id,
      status: status,
    });
    return { message: 'Tree status updated successfully.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to update tree status.' };
  }
}