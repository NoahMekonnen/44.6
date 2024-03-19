import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("it renders", function(){
  render(<Carousel photos={TEST_IMAGES} title="Rad pics"/>)
})

it("should match snapshot", function(){
  const carouselPhotos = TEST_IMAGES;
  const { asFragment } = render(<Carousel photos={carouselPhotos} title="Rad pics"/>)
  expect(asFragment()).toMatchSnapshot()
})

it("clicking left arrow should move to the 1st image from the 2nd image", function(){
  const carouselPhotos = TEST_IMAGES;
  const { getByTestId, getByText } = render(<Carousel photos={carouselPhotos} title="Rad pics"/>);

  const small1 = getByText("Image 1 of 3.");
  expect(small1).toBeInTheDocument();

  fireEvent.click(getByTestId("right-arrow"));
  const small2 = getByText("Image 2 of 3.");
  expect(small2).toBeInTheDocument();

  fireEvent.click(getByTestId("left-arrow"));
  const small3 = getByText("Image 1 of 3.");
  expect(small3).toBeInTheDocument();
})

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});
