import React from 'react';
import styled from 'styled-components';
import Button from '../ui/Button'; // Assicurati che il percorso sia corretto

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing(2)};

  th, td {
    padding: ${({ theme }) => theme.spacing(1.5)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceDark};
    text-align: left;
    white-space: nowrap; /* Evita il wrap del testo */
  }

  th {
    background: ${({ theme }) => theme.colors.surfaceLight};
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textLight};
  }

  tr:hover {
    background: ${({ theme }) => theme.colors.surfaceDark};
  }

  td:last-child {
    display: flex;
    gap: ${({ theme }) => theme.spacing(1)};
    align-items: center;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.textLight};
`;

/**
 * Componente Tabella Generica per l'Admin.
 *
 * @param {Object[]} columns - Array di oggetti { key: string, header: string }.
 * @param {Object[]} data - Array di oggetti contenenti i dati delle righe.
 * @param {Object[]} actions - Array di oggetti { label: string, onClick: Function(item) }.
 */
export default function AdminTable({ columns, data, rowKey, actions = [] }) {
  if (!data || data.length === 0) {
    return <EmptyMessage>Nessun dato da mostrare.</EmptyMessage>;
  }

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.header}</th>
            ))}
            {actions.length > 0 && <th>Azioni</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item[rowKey]}>
              {columns.map(col => (
                <td key={`${item[rowKey]}-${col.key}`}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
              {actions.length > 0 && (
                <td>
                  {actions.map(action => (
                    <Button
                      key={`${item[rowKey]}-${action.label}`}
                      onClick={() => action.onClick(item)}
                      small // Supponendo che il tuo Button abbia una prop 'small'
                    >
                      {action.label}
                    </Button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}