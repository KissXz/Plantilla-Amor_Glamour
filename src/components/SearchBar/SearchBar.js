import React, { useState, useEffect } from 'react';
import { Input, InputGroupAddon, InputGroupText, InputGroup } from 'reactstrap';

const SearchBar = ({ data, setFilteredData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const results = data.filter(item =>
      item.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.apellidoCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emailCliente.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data, setFilteredData]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <InputGroup style={{ marginLeft: 475 }}>
      <Input
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <InputGroupAddon addonType="append">
        <InputGroupText>
          <i className="nc-icon nc-zoom-split" />
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchBar;
