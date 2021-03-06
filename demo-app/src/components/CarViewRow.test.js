import * as React from "react";
import { render, mount, shallow } from "enzyme";

import { CarViewRow } from "./CarViewRow";

describe("<CarViewRow /> Enzyme Static HTML", () => {
  let car;

  beforeEach(() => {
    car = {
      id: 1,
      make: "Ford",
      model: "F-150",
      year: 1980,
      color: "red",
      price: 42000
    };
  });

  test("<CarViewRow /> renders", () => {
    const component = JSON.stringify(
      render(
        <table>
          <tbody>
            <CarViewRow
              car={car}
              onDeleteCar={() => null}
              onEditCar={() => null}
            />
          </tbody>
        </table>
      ).html()
    );

    expect(component).toMatchSnapshot();
  });
});

describe("<CarViewRow /> Enzyme Mock DOM", () => {
  const eventHandlers = {
    deleteCar: () => null,
    editCar: () => null
  };

  let car;
  let deleteCarSpy;
  let editCarSpy;
  let component;

  beforeEach(() => {
    car = {
      id: 1,
      make: "Ford",
      model: "F-150",
      year: 1980,
      color: "red",
      price: 42000
    };

    deleteCarSpy = jest.spyOn(eventHandlers, "deleteCar");
    editCarSpy = jest.spyOn(eventHandlers, "editCar");

    component = mount(
      <table>
        <thead>
          <CarViewRow
            car={car}
            onDeleteCar={eventHandlers.deleteCar}
            onEditCar={eventHandlers.editCar}
          />
        </thead>
      </table>
    ).find(CarViewRow);
  });

  test("<CarViewRow /> renders", () => {
    const columns = ["id", "make", "model", "year", "color", "price"];

    component
      .find("td")
      .slice(0, 6)
      .forEach((node, index) => {
        const carField = String(car[columns[index]]);
        expect(node.text()).toBe(carField);
      });
  });

  test("<CarViewRow /> delete car button", () => {
    component
      .find("button")
      .first()
      .simulate("click");
    component
      .find("button")
      .last()
      .simulate("click");

    expect(deleteCarSpy).toHaveBeenCalledWith(car.id);
    expect(editCarSpy).toHaveBeenCalledWith(car.id);
  });
});

describe("<CarViewRow /> Shallow with Enzyme", () => {
  const eventHandlers = {
    deleteCar: () => null,
    editCar: () => null
  };

  let car;
  let deleteCarSpy;
  let editCarSpy;
  let wrapper;

  beforeEach(() => {
    car = {
      id: 1,
      make: "Ford",
      model: "F-150",
      year: 1980,
      color: "red",
      price: 42000
    };

    deleteCarSpy = jest.spyOn(eventHandlers, "deleteCar");
    editCarSpy = jest.spyOn(eventHandlers, "editCar");

    wrapper = shallow(
      <CarViewRow
        car={car}
        onDeleteCar={eventHandlers.deleteCar}
        onEditCar={eventHandlers.editCar}
      />
    );
  });

  test("<CarViewRow /> renders", () => {
    const columns = ["id", "make", "model", "year", "color", "price"];

    wrapper
      .find("td")
      .slice(0, 6)
      .forEach((node, index) => {
        const carField = String(car[columns[index]]);
        expect(node.text()).toBe(carField);
      });
  });

  test("<CarViewRow /> buttons", () => {
    wrapper
      .find("button")
      .first()
      .simulate("click");
    wrapper
      .find("button")
      .last()
      .simulate("click");

    expect(deleteCarSpy).toHaveBeenCalledWith(car.id);
    expect(editCarSpy).toHaveBeenCalledWith(car.id);
  });
});
