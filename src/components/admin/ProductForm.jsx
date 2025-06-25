import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import Button from '../ui/Button';
import Input from '../ui/Input';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8em;
  margin-top: -${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const CATEGORIES = ['Motore', 'Carrozzeria', 'Accessori', 'Detersivi', 'Utensili', 'Elettrici'];
const BRANDS = [
  { id: 1, name: 'Polini' },
  { id: 2, name: 'Malossi' },
  { id: 3, name: 'Piaggio' },
  { id: 4, name: 'Yamaha' },
  { id: 5, name: 'Aprilia' },
];

const schema = yup.object({
  title: yup.string().required('Il nome è obbligatorio'),
  description: yup.string().required('La descrizione è obbligatoria'),
  price: yup.number().typeError('Il prezzo deve essere un numero').min(0, 'Il prezzo non può essere negativo').required('Il prezzo è obbligatorio'),
  stock: yup.number().typeError('Lo stock deve essere un numero').min(0, 'Lo stock non può essere negativo').required('Lo stock è obbligatorio'),
  category: yup.string().oneOf(CATEGORIES, 'Categoria non valida').required('La categoria è obbligatoria'),
  brandId: yup.number().oneOf(BRANDS.map(b => b.id), 'Brand non valido').required('Il brand è obbligatorio'),
  images: yup.array().of(yup.string().url('L\'URL dell\'immagine non è valido')).min(1, 'Almeno un\'immagine è obbligatoria'),
});

/**
 * Modulo per aggiungere o modificare un prodotto.
 *
 * @param {Object} [defaultValues] - Dati del prodotto da pre-compilare per la modifica.
 * @param {Function} onSubmitForm - Callback da eseguire al submit del form.
 * @param {Function} onCancel - Callback per annullare la modifica.
 */
export default function ProductForm({ defaultValues, onSubmitForm, onCancel }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues, images: defaultValues?.images || [''] }
  });

  useEffect(() => {
    reset({ ...defaultValues, images: defaultValues?.images || [''] });
  }, [defaultValues, reset]);

  const handleAddImageField = () => {
    reset(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const handleRemoveImageField = (index) => {
    reset(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const onSubmit = (data) => {
    onSubmitForm(data);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <h3>{defaultValues ? 'Modifica Prodotto' : 'Aggiungi Nuovo Prodotto'}</h3>

      <Input label="Nome Prodotto" placeholder="Nome del prodotto" {...register('title')} />
      {errors.title && <ErrorText>{errors.title.message}</ErrorText>}

      <Input label="Descrizione" placeholder="Descrizione dettagliata" as="textarea" rows="3" {...register('description')} />
      {errors.description && <ErrorText>{errors.description.message}</ErrorText>}

      <Input label="Prezzo (in centesimi)" type="number" placeholder="12345 (es. 123.45€)" {...register('price')} />
      {errors.price && <ErrorText>{errors.price.message}</ErrorText>}

      <Input label="Stock Disponibile" type="number" placeholder="Quantità in magazzino" {...register('stock')} />
      {errors.stock && <ErrorText>{errors.stock.message}</ErrorText>}

      <label>Categoria</label>
      <Select {...register('category')}>
        <option value="">Seleziona una categoria</option>
        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </Select>
      {errors.category && <ErrorText>{errors.category.message}</ErrorText>}

      <label>Brand</label>
      <Select {...register('brandId')}>
        <option value="">Seleziona un brand</option>
        {BRANDS.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
      </Select>
      {errors.brandId && <ErrorText>{errors.brandId.message}</ErrorText>}

      <label>Immagini (URL)</label>
      {Array.isArray(errors.images) && errors.images.length > 0 && errors.images?.message && (
        <ErrorText>{errors.images?.message}</ErrorText>
      )}
      {defaultValues?.images && defaultValues.images.map((_, index) => (
        <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Input placeholder={`URL Immagine ${index + 1}`} {...register(`images.${index}`)} />
          {defaultValues.images.length > 1 && (
            <Button type="button" onClick={() => handleRemoveImageField(index)}>🗑️</Button>
          )}
        </div>
      ))}
      <Button type="button" onClick={handleAddImageField} style={{ alignSelf: 'flex-start' }}>
        + Aggiungi URL Immagine
      </Button>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button type="submit" primary>{defaultValues ? 'Aggiorna Prodotto' : 'Crea Prodotto'}</Button>
        {onCancel && <Button type="button" onClick={onCancel}>Annulla</Button>}
      </div>
    </FormContainer>
  );
}
