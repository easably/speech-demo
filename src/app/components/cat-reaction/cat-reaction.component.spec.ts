import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatReactionComponent } from './cat-reaction.component';

describe('CatReactionComponent', () => {
  let component: CatReactionComponent;
  let fixture: ComponentFixture<CatReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatReactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
