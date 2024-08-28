// import { generateClient } from 'aws-amplify/data';
// import { type Schema } from '@/amplify/data/resource';
// import outputs from '@/amplify_outputs.json';
// import { Amplify } from 'aws-amplify';

// Amplify.configure(outputs);

// const client = generateClient<Schema>();


// const trees: {
//     variety: string;
//     rootstock: string;
//     yearPlanted: number;
//     row: number;
//     column: number;
//     status: string;
//   }[] = [
//     ...Array.from({ length: 22 }, (_, i) => ({
//       variety: 'Cox Orange Pippin',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 1,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 10 }, (_, i) => ({
//       variety: 'Virginia Hewes Crab',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 23,
//       column: 1,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 11 }, (_, i) => ({
//       variety: 'Northern Spy',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 2,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 20 }, (_, i) => ({
//       variety: 'Muscat de Bernay',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 12,
//       column: 2,
//       status: 'healthy',
//     })),
//     {
//       variety: 'Chisel Jersey',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: 32,
//       column: 2,
//       status: 'healthy',
//     },
//     ...Array.from({ length: 18 }, (_, i) => ({
//       variety: 'Yarlington Mill',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 3,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 11 }, (_, i) => ({
//       variety: 'Arkansas Black',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 19,
//       column: 3,
//       status: 'healthy',
//     })),
//     {
//       variety: 'Oxford Black',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: 30,
//       column: 3,
//       status: 'healthy',
//     },
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Chisel Jersey',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 31,
//       column: 3,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 4 }, (_, i) => ({
//       variety: 'Arkansas Black',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 4,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Yarlington Mill',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 5,
//       column: 4,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 6 }, (_, i) => ({
//       variety: 'Arkansas Black',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 7,
//       column: 4,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 21 }, (_, i) => ({
//       variety: 'Golden Russet',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 12,
//       column: 4,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Unknown',
//       rootstock: '?',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Baeburn',
//       rootstock: '?',
//       yearPlanted: 2020,
//       row: i + 3,
//       column: 5,
//       status: 'healthy',
//     })),
//     {
//       variety: 'Whitney Crab',
//       rootstock: '?',
//       yearPlanted: 2020,
//       row: 5,
//       column: 5,
//       status: 'healthy',
//     },
//     {
//       variety: 'Amere de Berthcourt',
//       rootstock: '?',
//       yearPlanted: 2020,
//       row: 6,
//       column: 5,
//       status: 'healthy',
//     },
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Harry Masters Jersey',
//       rootstock: '?',
//       yearPlanted: 2020,
//       row: i + 7,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: "Ashmead's Kernel",
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: i + 9,
//       column: 5,
//       status: 'healthy',
//     })),
//     {
//       variety: 'Cineterre',
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: 11,
//       column: 5,
//       status: 'healthy',
//     },
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Mishelin',
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: i + 12,
//       column: 5,
//       status: 'healthy',
//     })),
//     {
//       variety: "Tremlett's Bitter",
//       rootstock: '?',
//       yearPlanted: 2020,
//       row: 14,
//       column: 5,
//       status: 'healthy',
//     },
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Sweet Coppin',
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: i + 15,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: "Tompkins King",
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: i + 17,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Lambrook Pippin',
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: i + 19,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Belle de Jardin',
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: i + 21,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Champlain',
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: i + 23,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Nehou',
//       rootstock: '?',
//       yearPlanted: 2020,
//       row: i + 25,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Red Vein Crab',
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: i + 27,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Redfield',
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: i + 29,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 2 }, (_, i) => ({
//       variety: 'Isle of Wight',
//       rootstock: 'ELMA-06',
//       yearPlanted: 2020,
//       row: i + 31,
//       column: 5,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 32 }, (_, i) => ({
//       variety: 'Stoke Red',
//       rootstock: 'G-890',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 6,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 32 }, (_, i) => ({
//       variety: 'Harrison',
//       rootstock: 'G-890',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 7,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 32 }, (_, i) => ({
//       variety: 'Dabinette',
//       rootstock: 'G-935',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 8,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 32 }, (_, i) => ({
//       variety: 'Harrison',
//       rootstock: 'G-890',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 9,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 32 }, (_, i) => ({
//       variety: 'Harrison',
//       rootstock: 'G-890',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 10,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 32 }, (_, i) => ({
//       variety: 'Kingston Black',
//       rootstock: 'G-890',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 11,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 32 }, (_, i) => ({
//       variety: 'Kingston Black',
//       rootstock: 'G-890',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 12,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 32 }, (_, i) => ({
//       variety: 'Kingston Black',
//       rootstock: 'G-890',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 13,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 32 }, (_, i) => ({
//       variety: 'Brown Snout',
//       rootstock: 'G-890',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 14,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 9 }, (_, i) => ({
//       variety: 'Brown Snout',
//       rootstock: 'G-890',
//       yearPlanted: 2020,
//       row: i + 1,
//       column: 15,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 3 }, (_, i) => ({
//       variety: 'Kingston Black',
//       rootstock: 'G-890',
//       yearPlanted: 2020,
//       row: i + 10,
//       column: 15,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 10 }, (_, i) => ({
//       variety: 'Pudget Spice',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 13,
//       column: 15,
//       status: 'healthy',
//     })),
//     ...Array.from({ length: 10 }, (_, i) => ({
//       variety: 'Antonovka',
//       rootstock: 'M-111',
//       yearPlanted: 2020,
//       row: i + 23,
//       column: 15,
//       status: 'healthy',
//     })),
// ]

// const BATCH_SIZE = 1; // Adjust the batch size as needed


// export async function importTrees() {
//     for (let i = 0; i < trees.length; i += BATCH_SIZE) {
//       const batch = trees.slice(i, i + BATCH_SIZE);
//       const promises = batch.map(tree => 
//         client.models.Tree.create({
//           variety: tree.variety,
//           rootstock: tree.rootstock,
//           yearPlanted: tree.yearPlanted,
//           row: tree.row,
//           column: tree.column,
//         }).then(() => {
//           console.log(`Inserted tree: ${tree.variety} at row ${tree.row}, column ${tree.column}`);
//         }).catch(error => {
//           console.error(`Error inserting tree: ${error}`);
//         })
//       );
//       await Promise.all(promises);
//     }
//   }
  
//   export async function deleteAllTrees() {
//     try {
//       // Fetch all trees
//       const { data, errors } = await client.models.Tree.list();
//       if (errors) {
//         console.error('Error fetching trees:', errors);
//         throw new Error('Error fetching tree data.');
//       }
  
//       // Delete each tree
//       const deletePromises = data.map(tree => 
//         client.models.Tree.delete({ id: tree.id }).then(() => {
//           console.log(`Deleted tree: ${tree.variety} at row ${tree.row}, column ${tree.column}`);
//         }).catch(error => {
//           console.error(`Error deleting tree: ${error}`);
//         })
//       );
  
//       await Promise.all(deletePromises);
//       console.log('All trees deleted successfully.');
//     } catch (error) {
//       console.error('Database Error:', error);
//       throw new Error('Failed to delete all trees.');
//     }
//   }