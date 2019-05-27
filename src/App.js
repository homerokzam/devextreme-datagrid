import React, { useState, useRef, useEffect } from 'reactn';

import { Button, Popover,Form } from 'devextreme-react';
import DataGrid, { GroupPanel, Grouping, Paging, Column, Summary, GroupItem, FilterRow } from 'devextreme-react/data-grid';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import { SimpleItem, RequiredRule, ButtonItem } from 'devextreme-react/form';
import ArrayStore from 'devextreme/data/array_store';

import moment from 'moment';

import { dados } from './data'

import logo from './logo.svg';
import './App.css';

const App = (props) => {

  const storeVazia = new ArrayStore({ key: "oid", data: [] });

  const [currentFiltro, setCurrentFiltro] = useState({ inicial: moment().endOf('day').add(-3, 'month').startOf('month').toDate(), final: moment().endOf('day').toDate() });
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);

  const [dataSourceData, setDataSourceData] = useState(storeVazia);

  const refDataGridData = useRef();
  const refFormFiltro = useRef();

  const handleOnClickFilter = (e) => {
    setFilterOptionsVisible(true);
  }

  const hideWithFilterOptions = (e) => {
    setFilterOptionsVisible(false);
  }

  const handleOnClickPesquisar = (e) => {
  }

  const handleAnoCellValue = (data) => {
    const ret = moment(data.data).startOf('year').format();
    //console.log(ret, data.data);
    return ret;
  }

  const handleMesCellValue = (data) => {
    const ret = moment(data.data).startOf('month');
    //console.log(ret);
    return ret;
  }

  const handleDiaSemanaCellValue = (data) => {
    const ret = moment(data.data).format("ddd");
    //console.log(ret);
    return ret;
  }

  const handleEditIconClick = (e) => { }
  const handleDeleteIconClick = (e) => { }


  useEffect(() => {
    console.log("useEffect", dados);
    const storeCaixas = new ArrayStore({ key: "oid", data: dados.caixas });
    setDataSourceData(storeCaixas);
  }, []);

  return (
    <>
      <Toolbar style={{ backgroundColor: 'rgba(247, 127, 127, 0.521)' }}>
        <Item location={'before'}><Button id='filter' icon={'filter'} onClick={handleOnClickFilter} /></Item>
        <Item location={'before'}><div className='toolbar-label'><b>Vendas</b></div></Item>
      </Toolbar>

      <Popover target={'#filter'} position={'top'} width={500} visible={filterOptionsVisible} onHiding={hideWithFilterOptions} shading={true}>
        <Form ref={refFormFiltro} formData={currentFiltro} labelLocation={'top'} colCount={2} >
          <SimpleItem dataField={'inicial'} label={ {text: 'Período'} } editorType={'dxDateBox'} >
            <RequiredRule message={"Data inicial é obrigatório!"} />
          </SimpleItem>

          <SimpleItem dataField={'final'} label={ {text: ' '} } editorType={'dxDateBox'} >
            <RequiredRule message={"Data final é obrigatório!"} />
          </SimpleItem>

          <ButtonItem horizontalAlignment={'left'} buttonOptions={ {text: 'Pesquisar', type: 'success', icon: 'find', onClick: handleOnClickPesquisar} }></ButtonItem>
        </Form>
      </Popover>

      <DataGrid dataSource={dataSourceData} allowColumnReordering={true} showBorders={true}  >

        <GroupPanel visible={true} />
        <Grouping autoExpandAll={false} />
        <FilterRow visible={true} />
        <Paging defaultPageSize={18} />

        <Summary>
          <GroupItem column={'contaAssinadaTotal'} summaryType={'sum'} displayFormat={'Conta Assinada {0}'} valueFormat={ {style: "currency", currency: "BRL", useGrouping: true} } />
          <GroupItem column={'fiscal'} summaryType={'sum'} displayFormat={'Fiscal {0}'} valueFormat={ {style: "currency", currency: "BRL", useGrouping: true} } />
          <GroupItem column={'gorjeta'} summaryType={'sum'} displayFormat={'Gorjeta {0}'} valueFormat={ {style: "currency", currency: "BRL", useGrouping: true} } />
          <GroupItem column={'saldo'} summaryType={'sum'} displayFormat={'Saldo {0}'} valueFormat={ {style: "currency", currency: "BRL", useGrouping: true} } />
        </Summary>

        <Column type={'buttons'} width={140}
          buttons={[{
            hint: 'Editar',
            icon: 'edit',
            onClick: handleEditIconClick
          }, {
            hint: 'Excluir',
            icon: 'trash',
            onClick: handleDeleteIconClick
          }]} />
        <Column dataField={'oid'} visible={false} />
        <Column dataField={'data'} caption={'Ano'} dataType={'date'} width={'5%'} groupIndex={0} autoExpandGroup={true} calculateCellValue={handleAnoCellValue} format={'yyyy'} />
        <Column dataField={'data'} caption={'Mês'} dataType={'date'} width={'5%'} groupIndex={1} calculateCellValue={handleMesCellValue} format={'MMM'} />
        <Column dataField={'data'} caption={'Data'} dataType={'date'} sortIndex={0} sortOrder={'Ascending'} width={'10%'} />
        <Column dataField={'data'} caption={'Dia Semana'} calculateCellValue={handleDiaSemanaCellValue} width={'10%'} />
        <Column dataField={'fechador'} caption={'Fechador'} width={'10%'} />
        <Column dataField={'dinheiroTotal'} caption={'Total (Dinheiro)'} dataType={'number'} format={ {style: "currency", currency: "BRL", useGrouping: true} } width={'10%'} />
        <Column dataField={'suprimento'} caption={'Suprimento'} dataType={'number'} format={ {style: "currency", currency: "BRL", useGrouping: true} } width={'10%'} />
        <Column dataField={'moeda'} caption={'Moeda'} dataType={'number'} format={ {style: "currency", currency: "BRL", useGrouping: true} } width={'10%'} />
        <Column dataField={'fiscal'} caption={'Fiscal'} dataType={'number'} format={ {style: "currency", currency: "BRL", useGrouping: true} } width={'10%'} />
        <Column dataField={'fechado'} width={'10%'} visible={false} />
        <Column dataField={'saldo'} caption={'Saldo'} format={ {style: "currency", currency: "BRL", useGrouping: true} } width={'10%'} />

      </DataGrid>
    </>
  );
}

export default App;