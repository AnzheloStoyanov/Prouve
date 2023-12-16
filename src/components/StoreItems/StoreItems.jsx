import styles from './StoreItems.module.css';
import { useContext, useEffect, useState } from 'react';
import { OrderMenu, FilterOverlay, StoreItem, Overlay } from '../index';
import { Button, Grid, Pagination } from '@mui/material';
import { productsService } from '../../services';
import { useSearchParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { isMobileContext } from '../../providers/isMobileContext';

const StoreItems = ({ triggerChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState({});
  const [productsCount, setProductsCount] = useState(0);
  const { isMobile } = useContext(isMobileContext);
  const [gridDementions, setGridDementions] = useState({ rows: !isMobile ? 6 : 9, cols: !isMobile ? 3 : 2 });
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    categories: ["all"],
    alergens: [],
    sortBy: "default",
    special: false
  });
  const [burgerState, setBurgerState] = useState(false);

  useEffect(() => {
    fetchProductsData(1, itemsPerPage, {});
    setFilters(extractFiltersFromQuery());
  }, [, triggerChange]);

  useEffect(() => {
    refreshGridState();
  }, [isMobile]);

  const openBurger = () => {
    setBurgerState(true);
  };

  const closeBurger = () => {
    setBurgerState(false);
  };

  const updateFilters = (newFilters) => {
    const temp = {
      ...filters,
      ...newFilters
    }

    return temp;
  }

  const refreshGridState = () => {
    setGridDementions({ rows: !isMobile ? 6 : 9, cols: !isMobile ? 3 : 2 });
  }

  const loadProducts = (newProducts, page) => {
    const modifiedProducts = { ...products };
    modifiedProducts[page] = newProducts;
    setProducts(modifiedProducts);
  };

  const handleChangePage = (event, page) => {
    fetchProductsData(page, itemsPerPage);
    setCurrentPage(page);

    document.getElementById("gridTop").scrollIntoView({ behavior: "smooth" });
  };

  const itemsPerPage = gridDementions.rows * gridDementions.cols;
  const fetchProductsData = async (page, itemsPerPage) => {
    try {
      const productsData = await productsService.getFilteredProducts(page, itemsPerPage, filters);

      if (productsCount !== productsData.length) {
        setProductsCount(productsData.length);
      }

      loadProducts(productsData.data, page);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const extractFiltersFromQuery = () => {
    return {
      alergens: searchParams.getAll("alergens"),
      categories: searchParams.getAll("categories"),
      special: searchParams.get("special") === "true" ? true : false,
      sortBy: searchParams.get("sortBy") ? searchParams.get("sortBy") : "Default"
    }
  }

  const getItem = (row, col, page) => {
    const index = (row * gridDementions.cols + col);
    if (products[page][index] === undefined) {
      return <div key={"dummy" + row + col + page} className={styles.dummyWidth}></div>;
    }
    const item = products[page][index];
    return <StoreItem key={item.name + row + col + page} name={item.name} price={item.price} img={item?.photos[0]} id={item.id} />
  }

  const onOrderSelect = (sortBy) => {
    const temp = updateFilters({ sortBy });

    setFilters({ ...temp })
    setSearchParams({ ...temp });
  }

  const onUpdateFilter = (newFilters) => {
    const temp = updateFilters(newFilters);

    setFilters({ ...temp })
    setSearchParams({ ...temp });
  }

  return <div>
    <div className={styles.showInLine}>
      {isMobile && (<>
        <div className={styles.half}>
          <div className="customButton">
            <Button variant="text" onClick={openBurger}>
              <MenuIcon /> Филтър
            </Button>
          </div>
          {!burgerState ? ('') : (
            <Overlay onClose={closeBurger}>
              <div className={styles.somePadding}>
                <FilterOverlay filters={filters} onFilterUpdate={onUpdateFilter} />
              </div>
            </Overlay>
          )}
        </div>
      </>)}
      <div className={styles.half}>
        <OrderMenu sortBy={filters.sortBy} onSelect={onOrderSelect}></OrderMenu>
      </div>
      {!isMobile && productsCount && (
        <Pagination className={styles.floatRight}
          count={Math.ceil(productsCount / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      )}
    </div>
    <div className={styles.wrapper}>
      <div>
        {!isMobile && <FilterOverlay filters={filters} onFilterUpdate={onUpdateFilter} />}
      </div>
      <div className={styles.fullWidth}>
        <div className="customGrid">
          <div id="gridTop"></div>
          {products && products[currentPage] && (
            <Grid container>
              {[...Array(gridDementions.rows)].map((_, rowIndex) => (
                <>
                  {[...Array(gridDementions.cols)].map((_, colIndex) => {
                    const item = getItem(rowIndex, colIndex, currentPage);
                    return item;
                  })}
                </>
              ))}
            </Grid>
          )}
        </div>
        {
          productsCount &&
          <div className={styles.paginationPadding}>
            <Pagination siblingCount={1} boundaryCount={1}
              count={Math.ceil(productsCount / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          </div>
        }
      </div>
    </div>
  </div>
};

export default StoreItems;
