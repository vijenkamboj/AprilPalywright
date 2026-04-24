import { test, expect } from "@playwright/test";
test("Dialog box and mouse hover", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //handling alerts pop up dialog box
  page.on("dialog", (dialog) => dialog.accept());
  //console.log(dialog.message());
  await page.locator("#confirmbtn").click();

  //mouse hover
  await page.locator("#mousehover").hover();

  //iframes

  const framepage = await page.frameLocator("#courses-iframe");
  await framepage.locator("a[href*='mentorship']").click();
});

//drag and drop-Recommeneded way to do drag and drop

test("Drag and drop using dragTo()", async ({ page }) => {
  await page.goto(
    "http://only-testing-blog.blogspot.com/2014/09/drag-and-drop.html",
  );

  const source = page.locator("#drag-source");
  const target = page.locator("#drop-target");

  await source.dragTo(target);
});
//drag and drop-Old way to do drag and drop

test("Drag and drop using dragandDrop()", async ({ page }) => {
  await page.goto(
    "http://only-testing-blog.blogspot.com/2014/09/drag-and-drop.html",
  );
  const source = await page.$("#drag-source");
  const target = await page.$("#drop-target");

  await source.dragAndDrop(target);
});

//Hidden elements: Dragging fails if the source or target is off-screen. Use scrollIntoViewIfNeeded()
